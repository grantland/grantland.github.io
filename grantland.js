window.onload = function() {
  Parse.initialize('VgVPYNChzcv6NOP8hEDIymif8aEahJKJiuX7o1be', 'vJtJVCmRCKszpSdnaqbxbjx6ixU8mRJxs1EpcIeE');

  // Headers
  var onMouseOver = function(event) {
    var id = event.target.id;
    var headers = document.getElementsByClassName('header');
    [].forEach.call(headers, function(element) {
      element.style.display = element.classList.contains(id) ? 'block' : 'none';
    });
  }

  var ids = ['email', 'twitter', 'github', 'instagram'];
  ids.forEach(function(id) {
    document.getElementById(id).addEventListener('mouseover', onMouseOver);
  });

  // Instagram
  var query = new Parse.Query('Media');
  query.equalTo('type', 'image');
  query.notEqualTo('location', null);
  query.descending('created_time');
  query.find().then(function(results) {
    results = results.filter(function(result) {
      var image = result.get('images').standard_resolution;
      return result.get('users_in_photo').length == 0;
    });
    var result = results[Math.floor(Math.random(0) * results.length)];

    var imageUrl = result.get('images').standard_resolution.url;
    var locationName = result.get('location').name;
    var link = result.get('link');

    document.getElementById('image').style.backgroundImage = "url('" + imageUrl + "')";
    document.getElementById('instagram').innerHTML = locationName;
    document.getElementById('instagram').href = link;
  }, function(error) {
    console.log(error);
  });
}
