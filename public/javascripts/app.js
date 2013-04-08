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
          console.log(product)
          var context = {
              headline: product.headline,
              productImage: product.productImage,
              currentBid: product.currentBid,
              hoursLeft: product.hoursLeft,
              minutesLeft: product.minutesLeft
            },
            html = template(context);
          $('.auction-columns').append(html);
        })
      },
      error: function(xhr, errorType, error) {
        console.log(['now there was error', xhr, errorType, error]);
      }
    });
  }

  return {
    getProducts: getProducts
  };
})();