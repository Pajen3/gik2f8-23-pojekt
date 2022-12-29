class Api {

<<<<<<< HEAD
    url = '';
  
    constructor(url) {
      this.url = url;
    }
  
  create(person) {
      const JSONData = JSON.stringify(person);
      console.log(`Sending ${JSONData} to ${this.url}`);
  
      const request = new Request(this.url, {
        method: 'POST',
        body: JSONData,
        headers: {
          'content-type': 'application/json'
        }
      });
  
      return fetch(request)
        .then((result) => result.json())
        .then((data) => data)
        .catch((err) => console.log(err));
   }

  getEmployee() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  
  delete(id) {
    try{
      return fetch(`${this.url}/${id}`, {
        method: 'DELETE'
      })
        .then((result) => result)
        .catch((err) => console.log(err));
    }
    catch(e){
      console.log(e)
    }    
  }

  }
  
=======
  url = '';

  constructor(url) {
    this.url = url;
  }

create(person) {
    const JSONData = JSON.stringify(person);
    console.log(`Sending ${JSONData} to ${this.url}`);

    const request = new Request(this.url, {
      method: 'POST',
      body: JSONData,
      headers: {
        'content-type': 'application/json'
      }
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
 }

getEmployee() {
  return fetch(this.url)
    .then((result) => result.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

}
>>>>>>> f9b1cd3b799443957dc86140de1c37d1f1391488
