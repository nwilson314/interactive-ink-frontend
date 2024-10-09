<script lang="ts">
    import { onMount } from 'svelte';
    import { storyData, type Story, type StoryBlock } from '$lib/stores';
  
    let story: Story | null = null;
  
    onMount(() => {
      const unsubscribe = storyData.subscribe((value) => {
        story = value;
      });
  
      if (!story) {
        alert('No story data found. Please initiate a new story.');
        window.location.href = '/create';
      }
  
      return () => {
        unsubscribe();
      };
    });
  
    function handleChoice(choice: string) {
      // TODO: Implement choice handling logic
      alert(`You selected: ${choice}`);
    }
  </script>
  
  <section class="max-w-2xl mx-auto">
    {#if story}
      <h2 class="text-3xl font-semibold mb-6 text-center">Your Story</h2>
      <p class="text-gray-600 mb-4 text-center">
        Genre: <strong>{story.genre}</strong> | Length: <strong>{story.length}</strong>
      </p>
  
      <!-- Display the story blocks -->
      {#each story.blocks as block}
        <!-- Display the content of the segment -->
        <p class="mb-4">{block.segment.content}</p>
  
        <!-- If the block has choices and no choice has been made yet -->
        {#if block.segment.choices.length > 0 && !block.chosen}
          <div class="mb-4">
            <p class="font-semibold">What do you do next?</p>
            <ul>
              {#each block.segment.choices as choice}
                <li>
                  <button
                    class="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
                    on:click={() => handleChoice(choice)}
                  >
                    {choice}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
  
        <!-- If a choice has been made, display it -->
        {#if block.chosen}
          <p class="mb-4"><em>You chose: {block.chosen}</em></p>
        {/if}
      {/each}
    {:else}
      <p>Loading story...</p>
    {/if}
  </section>
  