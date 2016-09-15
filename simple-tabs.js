define([
    'jquery',
    'jquery/ui'
], function($) {
    'use strict';

    /* Inside the widget container, the titles can be put in a wrapper with a class ending in 'titles'
     * or as children in the container with a class ending with "title". eg: '.look-book-title'.
     * The tab content can be in a wrapper with a class ending in 'tabs' or as children in the container
     * with a class ending with "tab".
     * The titles and tabs have to be in order i.e. the first title will open the first tab.
     * THIS DESCRIPTION IS OUTDATED TODO: UPDATE IT */
     
    $.widget('drgz.simpleTabs', {
        options: {
            titleSelector: '.title',
            tabSelector: '.tab'
        },

        _create: function () {
            var self = this;

            var tabsContainer = self.element.children(self.options.tabSelector);
            self.tabs = tabsContainer.length ?
                tabsContainer.find(self.options.tabSelector) :
                self.element.find(self.options.tabSelector);

            var titlesContainer = self.element.children(self.options.titleSelector);
            self.titles = titlesContainer.length ?
                titlesContainer.find(self.options.titleSelector) :
                self.element.find(self.options.titleSelector);

            if (!self.titles.length) {
                self.titles = titlesContainer.children();
            }
            if (!self.tabs.length) {
                self.tabs = tabsContainer.children();
            }

            /* Hide all the tabs just in case */
            self.tabs.hide();

            for (var i = 0; i < self.titles.length; i++) {
                var title = self.titles[i];
                $(title).data('tab', self.tabs[i]);
            }

            self.titles.on('click', function (event) {
                event.preventDefault();
                self.setActive(this);
            });

            /* Show the first tab */
            self.setActive(self.titles[0]);

            self.element.addClass('simple-tabs');
        },

        setActive: function (title) {
            var self = this;

            self.titles.removeClass('selected');
            $(title).addClass('selected');
            self.tabs.hide();
            $($(title).data('tab')).show();
            
            self.element.trigger('tabChanged', [$(title), $($(title).data('tab'))]);
        }
    });

    return $.drgz.simpleTabs;
});
