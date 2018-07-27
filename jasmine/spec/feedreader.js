/* feedreader.js
 *
 * This spec file will test against RSS Feeds function in app.js file
 *
 */

/* All test suites contain in this function
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test Suite #1
     * contains set of tests related to RSS feeds definitions,
     * and the allFeeds variable in app.js.
    */
    describe('RSS Feeds', function() {
        /* Test #1 - make sure allFeeds variables are defined,
         * and not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test #2 - verify if property 'url' in each feed object is
         * defined and not empty.
         */
         it('has defined URL and URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });


        /* Test #3 - verify if property 'name' in each feed object is
         * defined and not empty.
         */
         it('has defined name and name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });


    /* Test Suite #2
     * contains set of tests for the application's menu
     */
    describe('The menu', function() {
        /* Test #4 - verify if the slide menu is hidden by
         * default in the application.
         */
        it('is hidden by default', function() {
            // verify if the body has the class "menu-hidden"
            let hidden = $('body').hasClass('menu-hidden');
            
            // if hidden is true, the menu element is off screen
            expect(hidden).toBe(true);
        });

        /* Test #5 - verify if clicking the menu icon can 
         * hide and show the slide menu.
         */
        it('changes visibility on click event', function() {
            // first click will show the menu
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // click again will hide the menu
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test Suite #3
     * contains test for RSS Feed initial feed.
     */
    describe('Initial Entries', function() {
        // load first feed before testing
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test #6 - after finish loading, verify if there is at least 
         * one entry in the feed.
         */
        it('have at least single entry', function(done) {
            //expect($('.feed').find('.entry').length).not.toBeLessThan(1);
            // suggested code from Reviewer, make it less redundant.
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* Test Suite #4
     * Contain test for new feeds
     */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         // define two variable, one for each feed
         let entriesStart, entriesNew;

        beforeEach(function(done) {
            // suggested by Reviewer
            // load first feed
            loadFeed(0, function(){
                // feed 0 done loading
                // store contents in a variable
                entriesStart = $('.entry').find('h2').toArray();
                // load second feed as a callback of the first
                loadFeed(1, function(){
                    // feed 1 done loading
                    // store content of the second feed in another variable
                    entriesNew = $('.entry').find('h2').toArray();
                    done();
                });
            });
        });

        /* Test #7 - Verify if new feeds indeed changes the content.
         * After loading two different feeds, and store the contents
         * compare the contents to make sure they are actually different
         */
        it('have at least single entry', function(done) {
            expect(entriesStart[0].innerHTML).not.toBe(entriesNew[0].innerHTML);
            done();
        });
    });
        
}());
