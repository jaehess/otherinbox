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
// MENTORS
// I've flushed out the functionality when entering the state by
// exactly plagiarizing the enter-state behavior defined by core.js.  It feels correct,
// but I haven't tested it yet.  Am I on the right track here?  I realize that I still
// have to connect events which I'll do next.

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

      enterState: function() {

        // document.title delegated to state Messages

        // uses the same main pane as Sign Out, currently
        var pane = OI.bodyPage.get('mainPane') ;
        if (!pane.get('isAttached')) pane.append() ;
      },

      initialSubstate: 'Messages',

      /**
       * B1
       */
      Messages: Ki.State.design({

        enterState: function() {
          // document.title is handled by the updateChrome() method:
          OI.updateChrome() ; // make sure it runs when we switch here
        },

        initSubstate: 'Focus',

        /**
         * C1
         */
        Focus: Ki.State.design({

          // MENTORS
          // If there is nothing to do in a parent enter-state, won't control
          // automatically pass through to the default child substate specified in initSubstate?
          // Hence: in this place is there any reason for this enterState function
          // to be implemented?  Or can I remove it?
          enterState: function() {
            // alert("State 'C1' (Focus) not implemented.") ;
          },

          initSubstate: 'Mailboxes',

          /**
           * D1
           */
          Mailboxes: Ki.State.design({

            enterState: function() {
              // alert("entering goStateD1") ;
              OI.bodyPage.get('mailboxList').becomeFirstResponder() ;
            },

            initSubstate: 'ExamineFolderMailboxes',

            /**
             * E1 (transient state)
             */
            ExamineFolderMailboxes: Ki.State.design({

              enterState: function() {
                  // var mailboxes = this.folderController.get('mailboxes') ;
                  // if (!mailboxes) {
                  //   this.goState('e', 2) ; // we're loading for sure!
                  // } else {
                  //   if (mailboxes.get('length') === 0) {
                  //     if (mailboxes.get('queryKey').get('isLoading')) {
                  //       this.goState('e', 2) ;
                  //     } else {
                  //       this.goState('e', 3) ;
                  //     }
                  //   } else {
                  //     var guid = this.folderController.get('guid') ;
                  //     var sel = this.selectedMailbox[guid] ;
                  //     if (sel && mailboxes.indexOf(sel) !== -1) {
                  //       // use previous selection
                  //       OI.bodyPage.get('mailboxList').select(sel, NO) ;
                  //     } else {
                  //       // select the first mailbox (and remember that we did)
                  //       this.selectedMailbox[guid] = mailboxes.firstObject() ;
                  //       OI.bodyPage.get('mailboxList').select(0, NO) ;
                  //     }
                  //     this.goState('e', 4) ;
                  //   }
                  // }
              }

            }),

            /**
             * E2
             */
            LoadingMailboxes: Ki.State.design({

              enterState: function() {
                alert("State 'E2' (LoadingMailBoxes) not implemented.") ;
              }

            }),

            /**
             * E3
             */
            FolderHasNoMailboxes: Ki.State.design({

              enterState: function() {
                alert("State 'E3' (FolderHasNoMailboxes) not implemented.") ;
              }

            }),

            /**
             * E4
             */
            MailboxSelected: Ki.State.design({

              enterState: function() {
                alert("State 'E4' (MailboxSelected) not implemented.") ;
              }

            })

          }),

          /**
           * D2
           */
          Messages: Ki.State.design({

            enterState: function() {
              // alert("entering State 'D2' (Focus>Messages") ;
              OI.bodyPage.get('messageList').becomeFirstResponder() ;
            },

            initSubstate: 'ExamineMailboxMessages',

            /**
             * F1 (transient)
             */
            ExamineMailboxMessages: Ki.State.design({

              enterState: function() {
                // var messages = this.mailboxController.get('messages') ;
                // if (!messages || messages.get('queryKey').get('isLoading')) {
                //   this.goState('f', 2) ; // we're loading for sure!
                // } else {
                //   var guid = this.mailboxController.get('guid') ;
                //   if (this.prefetch) {
                //     if (this.mailboxController.get('unreadCount') === 0) {
                //       throw new Error("prefetch should be NO since mailbox %@ has no unread messages".fmt(guid)) ;
                //     }
                //     // set the previous selection to the first unread message, then select it
                //     var idx, obj, len = messages.get('length') ;
                //     for (idx=0; idx<len; ++idx) {
                //       obj = message.objectAt(idx) ;
                //       if (obj.get('isUnread')) break ;
                //     }
                //     if (idx === len) { // didn't find one but should have
                //       throw new Error("mailbox %% unreadCount does not match count of unread messages".fmt(guid)) ;
                //     }
                //     var sel = [messages[idx]] ;
                //     this.selectedMessages[guid] = sel ; // save as previous selection
                //     OI.bodyPage.get('messageList').select(idx, NO) ;
                //   } else if (OI.bodyPage.getPath('messageList.selection.length') === 0) {
                //     var sel = this.selectedMessages[guid] ;
                //     if (sel) {
                //       var newSel = [], idxSet = SC.IndexSet.create(),
                //           idx, obj, len = sel.get('length') ;
                //       for (idx=0; idx<len; ++idx) {
                //         obj = sel[idx] ;
                //         if (messages.indexOf(obj) !== -1) {
                //           newSel.push(obj) ;
                //           idxSet.add(idx, 1) ;
                //         }
                //       }
                //       if (newSel.length > 0) {
                //         this.selectedMessages[guid] = newSel ;
                //         OI.bodyPage.get('messageList').select(idxSet, NO) ;
                //       } else {
                //         this.selectedMessages[guid] = [messages.firstObject()] ;
                //         OI.bodyPage.get('messageList').select(0, NO) ;
                //       }
                //     } else {
                //       this.selectedMessages[guid] = [messages.firstObject()] ;
                //       OI.bodyPage.get('messageList').select(0, NO) ;
                //     }
                //     this.goState('f', 4) ;
                //   } else {
                //     var sel = OI.bodyPage.getPath('messageList.selection') ;
                //     var newSel = [] ;
                //     sel.forEach(function(obj) {
                //       newSel.push(obj) ;
                //     });
                //     this.selectedMessages[guid] = newSel ;
                //     // objects are already selected in the UI
                //     this.goState('f', 4) ;
                //   }
                // }
              }

            }),

            /**
             * F2
             */
            LoadingMessages: Ki.State.design({

              enterState: function() {
                alert("State 'F2' (LoadingMessages) not implemented.") ;
              }

            }),

            /**
             * F3
             */
            NoSelection: Ki.State.design({

              enterState: function() {
                alert("State 'F3' (NoSelection) not implemented.") ;
              }

            }),

            /**
             * F4
             */
            MessageSelected: Ki.State.design({

              enterState: function() {
                console.log("State 'F4' (MessageSelected) not implemented.") ;
              }

            })

          })

        }),

        /**
         * C2
         */
        Reload: Ki.State.design({

          enterState: function() {
            alert("State 'C2' (Reload) not implemented.") ;
          }

        }),

        /**
         * C3
         */
        Error: Ki.State.design({

          enterState: function() {
            alert("State 'C3' (Error) not implemented.") ;
          }

        }),

        /**
         * C4
         */
        Mailbox: Ki.State.design({

          enterState: function() {
            alert("State 'C4' (Mailbox) (drag) not implemented.") ;
          }

        }),

        /**
         * C5
         */
        Messages: Ki.State.design({

          enterState: function() {
            alert("State 'C5' (Messages) (drag) not implemented.") ;
          }

        })


      }),

      /**
       * B2
       */
      Receipts: Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Receipts".loc() ;
          alert("State 'B2' (Receipts) not implemented.") ;
        }

      }),

      /**
       * B3
       */
      Coupons: Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Receipts".loc() ;
          alert("State 'B3' (Coupons) not implemented.") ;
        }

      }),

      /**
       * B4
       */
      Calendar: Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Calendar".loc() ;
          alert("State 'B4' (Calendar) not implemented.") ;
        }

      })

    }),

    /**
     * A2
     */
    SignOut: Ki.State.design({

      enterState: function() {
        document.title = "_OtherInbox - Sign Out".loc() ;

        // uses the same main pane as Application, currently
        var pane = OI.bodyPage.get('mainPane') ;
        if (!pane.get('isAttached')) pane.append() ;

        // FIXME need to show the sign out UI!

      }

    })

  })

});

