<script context="module">
    export async function load({ session }) {
      
      return {
        props: {
          user: session.user,
        },
      };
    }
</script>
<script lang="ts">
import { dataset_dev } from "svelte/internal";

  export let user;

	async function fetchData() {
		//return await ({content: 'manual'});
		return await (await fetch(`http://localhost:3000/api/data`)).json();
		// return await (await fetch('http://localhost:3000/api/notexisting')).json();
	}

	let dataPromise = fetchData();
</script>
{#if user}
  <h2>Welcome {user}</h2>
  <a href="/logout">
    <button>Logout</button>
  </a>
  {:else}
  <a href="/login">
    <button>Login using Github</button>
  </a>
{/if}
<a href="/admin">admin page</a>


{#await dataPromise}
fetching data...
{:then data}
  fetched data = {data.content}
{:catch error}
  fetching data is unauthorized
{/await}
