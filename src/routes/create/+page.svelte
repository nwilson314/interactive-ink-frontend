<script lang="ts">
  import {
    Genre,
    StoryLength,
    type LengthOption,
    genres,
    lengthOptions,
  } from "$lib/types";
  import { API_BASE_URL } from "$lib/config";
  import { storyData, type Story } from "$lib/stores";
  import { goto } from "$app/navigation";

  let selectedGenre: Genre | "" = "";
  let selectedLengthOption: LengthOption = "Medium"; // Default selection
  let isLoading = false;

  async function handleSubmit() {
    if (!selectedGenre) {
      alert("Please select a genre.");
      return;
    }

    isLoading = true;

    const payload = {
      genre: selectedGenre,
      length: selectedLengthOption,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/story/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();
      storyData.set(data as Story);

      goto("/story");
    } catch (error) {
      console.error("Error initiating story:", error);
      alert("An error occurred while initiating the story.");
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="max-w-xl mx-auto">
  <h2 class="text-3xl font-semibold mb-6 text-center">Customize Your Story</h2>

  <!-- Genre Selection -->
  <div class="mb-6">
    <label class="block text-lg mb-2">Choose a Genre:</label>
    <select bind:value={selectedGenre} class="w-full p-3 border rounded">
      <option value="" disabled selected>Select a genre</option>
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
  </div>

  <!-- Length Selection -->
  <div class="mb-6">
    <label class="block text-lg mb-4">Desired Story Length:</label>
    <div class="flex space-x-4">
      {#each lengthOptions as option}
        <label class="flex items-center">
          <input
            type="radio"
            name="storyLength"
            value={option}
            bind:group={selectedLengthOption}
            class="mr-2"
          />
          <span>{option}</span>
        </label>
      {/each}
    </div>
  </div>

  <button
    on:click={handleSubmit}
    class="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition-colors"
    disabled={isLoading}
  >
    {#if isLoading}
      Generating...
    {:else}
      Generate My Story
    {/if}
  </button>
</section>
