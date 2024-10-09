import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface StorySegment {
    content: string;
    choices: string[];
}

export interface StoryBlock {
    id_: string;
    segment: StorySegment;
    chosen?: string;
    block_template: string;
}

export interface Story {
    id_: string;
    blocks: StoryBlock[];
    genre: string;
    length: string;
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
            if (value !== undefined && value !== null) {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                sessionStorage.removeItem(key);
            }
        });
    }

    return store;
}

export const storyData = createPersistedStore<Story | null>('storyData', null);
