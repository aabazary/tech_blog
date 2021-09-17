async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').textContent;
  
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
  
document.getElementById('add-new-post').addEventListener('click', newFormHandler);