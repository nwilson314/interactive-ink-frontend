import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';


export interface Message {
    role: string;
    content: string;
}

export interface StoryData {
  story_id: string;
  messages: Message[];
  initiation_request: {
    genre: string;
    length: string;
  };
}

function createPersistedStore<T>(key: string, initialValue: T): Writable<T> {
    let storedValue: T = initialValue;
  
    if (browser) {
      const json = sessionStorage.getItem(key);
      if (json) {
        storedValue = JSON.parse(json);
      }
    }
  
    const store = writable<T>(storedValue);
  
    if (browser) {
      store.subscribe((value) => {
        if (value !== undefined) {
          sessionStorage.setItem(key, JSON.stringify(value));
        } else {
          sessionStorage.removeItem(key);
        }
      });
    }
  
    return store;
}

export const storyData = createPersistedStore<StoryData | null>('storyData', null);