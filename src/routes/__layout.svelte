<script context="module">
    export async function load({page, session}) {
      //   console.log('1111 page.path = ', page.path);
      //   console.log(/^\/admin\/(.*)/.test(page.path));
      //   console.dir(session.user);
      if (/^\/admin(.*)/.test(page.path) && session.user === '') {
      //   console.log('redirect to /');
        return { redirect: '/', status: 302 }
      }
      console.log('return empty props');
      return {
        props: {
          user: session.user,
        },
      };
    }
</script>

<script lang="ts">
    export let user;
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

<slot />
