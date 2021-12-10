'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">wichtel-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' : 'data-target="#xs-components-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' :
                                            'id="xs-components-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChannelsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChannelsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogAddChannelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAddChannelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogAddWishComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAddWishComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDataProtectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDataProtectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDeleteChannelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDeleteChannelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditWishComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditWishComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogJoinChannelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogJoinChannelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogLegalNoticeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogLegalNoticeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogStartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogStartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogUserDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogUserDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' : 'data-target="#xs-injectables-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' :
                                        'id="xs-injectables-links-module-AppModule-930d2437594805d9b8916390f6fddc2a510748b2bf54fda32726d818b3d1ddcea44fe50e3e879e1f8a16c05c2d756fdcbb57ecdbdf1b615e2eeeffe639e9793c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Channel.html" data-type="entity-link" >Channel</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChannelService.html" data-type="entity-link" >ChannelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GiftService.html" data-type="entity-link" >GiftService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});