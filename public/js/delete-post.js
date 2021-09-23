async function deleteButton(event) {
  event.preventDefault();
  var deleteBtn = document.getElementById('delete');
  var dataID = deleteBtn.getAttribute('data-id');
  console.log('dataID', dataID);

  const response = await fetch(`/api/posts/${dataID}`, {
      method: 'DELETE',
      body: JSON.stringify({
          post_id: dataID,
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (response.ok) {
      document.location.replace('/dashboard/');
  } else {
      alert(response.statusText);
  }
}

document.getElementById('delete').addEventListener('click', deleteButton);