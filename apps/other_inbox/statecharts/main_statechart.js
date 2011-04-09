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
// Am I on the right track here?  Here all I'm doing is defining the
// states as I understand them from using the otherinbox application;
// I'm not yet concerned with events and actions.  However, I am anticipating
// some useful external state variables.
//
// I'm continuing to look at the core_oi framework to extract the states from.
MyApp.statechart = Ki.Statechart.create({

  /**
   * external state variables for which folder you're in
   */
  INBOX_FOLDER_ID: 1,
  SAVED_FOLDER_ID: 2,
  DELETED_FOLDER_ID: 3,
  SENT_FOLDER_ID: 4,
  BLOCKED_FOLDER_ID: 5,

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

      Messages: Ki.State.design({

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

