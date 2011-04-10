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
// Here's my translation of the state chart defined in the graffle.
// At this point, only state definition.
// I presume I have the naming right, i.e. use the more descriptive
// name as the state name and the '<letter><digit>' in the comment; let
// me know if I have this wrong.
//
// Next am going to flesh out events

/**
 * While the application is loading, a much smaller custom statechart is used.  When
 * that process completes, the application is ready and put into the running state.
 * @return the statechart to manage the application's running state as described
 * in the document Statechart.graffle in folder 'design'.
 */
OI.runningStateChart = Ki.Statechart.create({

  rootState: Ki.State.design({

    initialSubstate: 'Application',

    /**
     * A1
     */
    Application: Ki.State.design({

      initialSubstate: 'Messages',

      /**
       * B1
       */
      Messages: Ki.State.design({

        /**
         * C1
         */
        Focus: Ki.State.design({

          initSubstate: 'Mailboxes',

          /**
           * D1
           */
          Mailboxes: Ki.State.design({

            initSubstate: 'ExamineFolderMailboxes',

            /**
             * E1
             */
            ExamineFolderMailboxes: Ki.State.design({
              
            }),

            /**
             * E2
             */
            LoadingMailboxes: Ki.State.design({

            }),

            /**
             * E3
             */
            FolderHasNoMailboxes: Ki.State.design({

            }),

            /**
             * E4
             */
            MailboxSelected: Ki.State.design({

            })
            
          }),

          /**
           * D2
           */
          Messages: Ki.State.design({

            initSubstate: 'ExamineMailboxMessages',

            /**
             * F1
             */
            ExamineMailboxMessages: Ki.State.design({

            }),

            /**
             * F2
             */
            LoadingMessages: Ki.State.design({

            }),

            /**
             * F3
             */
            NoSelection: Ki.State.design({

            }),

            /**
             * F4
             */
            MessageSelected: Ki.State.design({

            })

          })

        }),

        /**
         * C2
         */
        Reload: Ki.State.design({

        }),

        /**
         * C3
         */
        Error: Ki.State.design({

        }),

        /**
         * C4
         */
        Mailboxes: Ki.State.design({

        }),

        /**
         * C5
         */
        Messages: Ki.State.design({

        })


      }),

      /**
       * B2
       */
      Receipts: Ki.State.design({

      }),

      /**
       * B3
       */
      Coupons: Ki.State.design({

      }),

      /**
       * B4
       */
      Calendar: Ki.State.design({

      })

    }),

    /**
     * A2
     */
    SignOut: Ki.State.design({

    })

  })

});

