var CharityApp = (function() {

  // FIXME: Maybe not the best place to put this, but it'll do for
  // now.
  var UserId = 3333014; // 'Production' user
  // var UserId = 2023663; // 'Test' user

  var getProducts = function() {
    $.ajax({
      type: 'GET',
      url: '/users/' + UserId + '/items',
      success: function(data, status, xhr) {
        var source = $('#product-template').html(),
              template = Handlebars.compile(source),
              self = this;
        _.each(data.products, function(product) {
          var context = {
              headline: product.headline,
              productImage: product.productImage,
              currentBid: product.currentBid,
              hoursLeft: product.hoursLeft,
              minutesLeft: product.minutesLeft
            },
            html = template(context);
          $('.auction-columns').append(html);
        });

        $('.share-on-facebook').on('click', shareOnFacebook);

        $('.share-on-twitter').on('click', shareOnTwitter);
      },
      error: function(xhr, errorType, error) {
        console.log(['now there was error', xhr, errorType, error]);
      }
    });
  };

  var shareOnFacebook = function(e) {
    e.preventDefault();
    console.log('http://www.facebook.com/sharer.php?u=http://localhost:8080');
  };

  var shareOnTwitter = function(e) {
    e.preventDefault();
    console.log("http://twitter.com/share?text=Support%20charity!%20And%20buy%20new%20things!&url=http://localhost:8080");
  };

  return {
    getProducts: getProducts
  };
})();

CharityApp.getProducts();

