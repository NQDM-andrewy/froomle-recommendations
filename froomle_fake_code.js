// imports from Froomle:
import {
    getRecommendations,
    setEnvironment,
    setContextItem,
    setContextItemType,
    setConsent,
    setChannel,
    setUserId,
    setSubscriptionLevel,
    setPageVisit,
    sendItemInteraction,
} from '@froomle/frontend-sdk';

function recordPageVisit() {
    setEnvironment('production');

    if (onArticle) {
        setContextItem();
        setContextItemType();
    }

    // detecting if userHasConsent ...

    if (userHasConsent) {
        setConsent(2);
        const channel = ''; // mobile or desktop 
        setChannel(channel);

        // detecting if userIsLoggedIn ...

        if (userIsLoggedIn) {

            // detecting if userSubscribed ...

            if (userSubscribed) {
                setUserId(data_layer.user.id);
                setSubscriptionLevel('SUBSCRIBER');
            } else {
                setSubscriptionLevel('REGISTERED');
            }
        } else {
            setSubscriptionLevel('NONE');
        }
    } else {
        setConsent(0);
    }

    setPageVisit(pageType);
}

// Record Page Visit:
recordPageVisit();

// Adding exclusions if page already has items from recommended list:

// detecting if pageHasDuplicatedItems ...

if (pageHasDuplicatedItems) {
    getRecommendations(exclusions); // + exclusions
} else {
    getRecommendations(); // standard list
}

// Sending the 'Impression' event when articles are in viewport:

// detecting if articleInViewport ...

if (articleInViewport) {
    sendItemInteraction(article_id, 'article', 'impression');
}

// Recommended article click tracking:
const recommendedItem = document.querySelectorAll('.recommended-item');

recommendedItem.forEach((item) => {
    item.addEventListener('click', () => {
        sendItemInteraction(item.id, 'article', 'click_on_recommendation');
    })
});




