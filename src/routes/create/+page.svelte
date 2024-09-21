<script lang="ts">
    let genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror'];
    let selectedGenre: string = '';
    let storyLength: number = 500; // Update to enum
  
    function handleSubmit() {
        // Do nothing for now
        console.log('Genre:', selectedGenre);
        console.log('Length:', storyLength);
    }
  </script>
  
  <section class="max-w-xl mx-auto">
    <h2 class="text-3xl font-semibold mb-6 text-center">Customize Your Story</h2>
  
    <div class="mb-4">
      <label class="block text-lg mb-2">Choose a Genre:</label>
      <select bind:value={selectedGenre} class="w-full p-3 border rounded">
        <option value="" disabled selected>Select a genre</option>
        {#each genres as genre}
          <option value={genre}>{genre}</option>
        {/each}
      </select>
    </div>
  
    <div class="mb-6">
      <label class="block text-lg mb-2">Desired Story Length (words):</label>
      <input
        type="number"
        bind:value={storyLength}
        min="100"
        class="w-full p-3 border rounded"
      />
    </div>
  
    <button
      on:click={handleSubmit}
      class="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition-colors"
    >
      Generate My Story
    </button>
  </section>
  