<script lang="ts">
    import { onMount } from 'svelte';
    import { storyData, type StoryData, type Message } from '$lib/stores';
  
    let story: StoryData | null = null;
  
    let unsubscribe: () => void;
  
    if (typeof window !== 'undefined') {
      unsubscribe = storyData.subscribe((value) => {
        story = value;
      });
    }
  
    onMount(() => {
      if (!story) {
        alert('No story data found. Please initiate a new story.');
        window.location.href = '/create';
      }
  
      return () => {
        unsubscribe && unsubscribe();
      };
    });
  </script>
  
  <section class="max-w-2xl mx-auto">
    {#if story}
      <h2 class="text-3xl font-semibold mb-6 text-center">Your Story</h2>
      <p class="text-gray-600 mb-4 text-center">
        Genre: <strong>{story.initiation_request.genre}</strong> | Length: <strong>{story.initiation_request.length}</strong>
      </p>
      {#each story.messages.slice(2) as message}
        {#if message.role === 'assistant'}
          <p class="mb-4"><strong>Story:</strong> {message.content}</p>
        {:else if message.role === 'user'}
          <p class="mb-4"><strong>You:</strong> {message.content}</p>
        {/if}
      {/each}
      <!-- Future implementation: Add options for user choices -->
    {:else}
      <p>Loading story...</p>
    {/if}
  </section>
  