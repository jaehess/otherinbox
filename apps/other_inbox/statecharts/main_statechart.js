// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
// Created by oldfartdeveloper.
// Date: 4/9/11
// Time: 12:30 PM

// MENTORS
// Am I on the right track here?  I've found the core_oi framework to be
// difficult to mentally "parse".  Here all I'm doing is defining the
// states as I understand them from using the otherinbox application;
// I'm not yet concerned with events and actions.
MyApp.statechart = Ki.Statechart.create({

  rootState: Ki.State.design({

    initialSubstate: 'Loading',

    /**
     * The initial state while OtherInBox is loading
     */
    Loading: Ki.State.design({

    }),

    /**
     * When loading is complete, this is the running overview state.
     * The primary state is determined by which button is active in the toolbar.
     */
    Toolbar: Ki.State.design({

      initialSubstate: 'Messages',

      /**
       * The substates when Messages is selected in the tool bar
       * are defined by the buttons in the left pane.
       */
      Messages: Ki.State.design({

        initialSubstate: 'Inbox',

        Inbox: Ki.State.design({

        }),

        Saved: Ki.State.design({

        }),

        Deleted: Ki.State.design({

        }),

        Sent: Ki.State.design({

        }),

        Blocked: Ki.State.design({

        })

      }),

      Receipts: Ki.State.design({

      }),

      Coupons: Ki.State.design({

      }),

      Calendar: Ki.State.design({

      }),

      Help: Ki.State.design({

      }),

      Settings: Ki.State.design({

      })

    })

  })

});

