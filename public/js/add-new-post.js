async function addNewPost(event) {
    event.preventDefault();
  
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!title){
      
    }
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
document.getElementById('add-new-post').addEventListener('click', addNewPost);