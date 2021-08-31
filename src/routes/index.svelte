
<script lang="ts">
import { dataset_dev } from "svelte/internal";

	async function fetchData() {
		//return await ({content: 'manual'});
		return await (await fetch(`http://localhost:3000/api/data`)).json();
		// return await (await fetch('http://localhost:3000/api/notexisting')).json();
	}

	let dataPromise = fetchData();
</script>



{#await dataPromise}
fetching data...
{:then data}
  fetched data = {data.content}
{:catch error}
  fetching data is unauthorized
{/await}
