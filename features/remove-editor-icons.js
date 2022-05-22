    addclick2()
  function addclick2() {
    if (document.querySelector('#react-tabs-0 > img') === null) {
      window.setTimeout(addclick2, 50)
    } else {
      document.querySelector('#react-tabs-0 > img').remove()
      document.querySelector('#react-tabs-2 > img').remove()
      document.querySelector('#react-tabs-4 > img').remove()
    }
  }
