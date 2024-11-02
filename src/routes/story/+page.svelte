<script lang="ts">
  import { onMount, tick } from "svelte";
  import { storyData } from "$lib/stores";
  import { type Story } from "$lib/types";
  import { API_BASE_URL } from "$lib/config";

  let story: Story | null = null;
  let isLoading = false;
  let endOfMessages: HTMLDivElement;

  onMount(() => {
    const unsubscribe = storyData.subscribe((value) => {
      story = value;
    });

    if (!story) {
      alert("No story data found. Please initiate a new story.");
      window.location.href = "/create";
    }

    return () => {
      unsubscribe();
    };
  });

  async function handleChoice(choice: string) {
    if (!story) return;

    const latestBlockIndex = story.blocks.findIndex((block) => !block.chosen);

    if (latestBlockIndex === -1) {
      alert("No choices available.");
      return;
    }

    story.blocks[latestBlockIndex].chosen = choice;
    isLoading = true;

    try {
      const response = await fetch(`${API_BASE_URL}/story/continue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorText}`,
        );
      }

      const updatedStory = await response.json();

      // Update the storyData store with the new story
      storyData.set(updatedStory as Story);
    } catch (error) {
      console.error("Error continuing story:", error);
      alert(`An error occurred: ${error}`);
    } finally{
      isLoading = false;
      await tick();
      endOfMessages.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function getStoryLength(lengthOption: string): number {
    const lengthMapping: Record<string, number> = {
      Short: 3,
      Medium: 7,
      Long: 15,
    };
    return lengthMapping[lengthOption] || 7;
  }
</script>

<section class="max-w-2xl mx-auto">
  {#if story}
    <h2 class="text-3xl font-semibold mb-6 text-center">Your Story</h2>
    <p class="text-gray-600 mb-4 text-center">
      Genre: <strong>{story.genre}</strong> | Length:
      <strong>{story.length}</strong>
    </p>

    {#each story.blocks as block, index}
      {#if block.block_image}
        <img src="{block.block_image.url}" alt="{block.block_image.image_description}" class="mb-4 w-full h-auto object-cover" />
      {/if}
      <p class="mb-4">{block.segment.content}</p>

      {#if block.chosen}
        <div class="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p class="text-lg font-semibold text-yellow-800">
            You chose: <span class="italic">{block.chosen}</span>
          </p>
        </div>
      {/if}

      <!-- If the block has choices and no choice has been made yet, and it's the last block -->
      {#if block.segment.choices.length > 0 && !block.chosen && index === story.blocks.length - 1}
        <div class="mb-4">
          <p class="font-semibold">What do you do next?</p>
          <ul>
            {#each block.segment.choices as choice}
              <li>
                <button
                  class="bg-indigo-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
                  on:click={() => handleChoice(choice)}
                  disabled={isLoading}
                >
                  {choice}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    {/each}
    {#if story.blocks.length > getStoryLength(story.length)}
      <p class="font-semibold text-center mt-6">The End</p>
    {/if}
    {#if isLoading}
      <p class="text-center">Analyzing choice...</p>
    {/if}
  {:else}
    <p>Loading story...</p>
  {/if}
  <div bind:this={endOfMessages}></div>
</section>
