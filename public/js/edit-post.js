async function editPost(event) {
    event.preventDefault();
  
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').textContent;
  
    const response = await fetch(`/api/post`, {
      method: 'put',
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
  
document.getElementById('edit-post').addEventListener('click', editPost);