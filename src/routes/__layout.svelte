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
      return { props: {} }
    }
</script>
    
<slot />
