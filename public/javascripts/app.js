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
      },
      error: function(xhr, errorType, error) {
        console.log(['now there was error', xhr, errorType, error]);
      }
    });
  };

  var openSharePopup = function(shareUrl) {
    window.open(shareUrl, 'Share', 'toolbar=0,status=0,width=680,height=400');
  };

  var shareOnFacebook = function(e) {
    e.preventDefault();
    var u = location.href,
        t = document.title
    openSharePopup('http://www.facebook.com/sharer.php?u='+
      encodeURIComponent(u)+'&t='+encodeURIComponent(t));
  };

  var shareOnTwitter = function(e) {
    e.preventDefault();
    var u = 'http://hej.com',
        text = "Support charity, and buy something nice!";
    openSharePopup('http://twitter.com/share?text='+encodeURIComponent(text)+
      '&url='+encodeURIComponent(u));
  };

  return {
    getProducts: getProducts,
    shareOnFacebook: shareOnFacebook,
    shareOnTwitter: shareOnTwitter
  };
})();

CharityApp.getProducts();
$(document).foundation();
$('.share-on-facebook').on('click', CharityApp.shareOnFacebook);
$('.share-on-twitter').on('click', CharityApp.shareOnTwitter);