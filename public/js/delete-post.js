async function deleteButton(event) {
  event.preventDefault();
  var deleteBtn = document.querySelector('.delete-post');
  var dataID = deleteBtn.getAttribute('data-id');
  console.log('dataID', dataID);

  const response = await fetch(`/dashboard/posts/${dataID}`, {
        
      method: 'DELETE',
      body: JSON.stringify({
          post_id: dataID,
      }),
      headers: {
          'Content-Type': 'application/json',
      },
      
  });
console.log(response)
  if (response.ok) {
      document.location.replace('/dashboard/');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.delete-post').addEventListener('click', deleteButton);