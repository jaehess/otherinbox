// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
// Created by oldfartdeveloper.
// Date: 4/9/11
// Time: 12:30 PM

/**
 * While the application is loading, a much smaller custom statechart is used.  When
 * that process completes, the application is ready and put into the running state.
 * @return the statechart to manage the application's "running" state as described
 * in the document Statechart.graffle in folder 'design'.
 */
OI.runningStatechart = Ki.Statechart.create({

  trace: true,

  rootState: Ki.State.design({

    initialSubstate: 'Application',

    openCalendar: function() {
      window.open('/calendars', '_self') ;
    },

    openSettings: function() {
      window.open('/identity','_self') ;
    },

    /**
     * MENTORS
     * This probably needs a more specific state, but I'm not sure yet.
     */
    goToSignIn: function() {
      // oldfartdeveloper: not included in statechart yet.
      alert("OI.goToSignIn() is not statechart-enabled. Skipping.") ;
      return ;

      if (CoreOI.serverMode) {
        window.open('/signin','_self');
      } else {
        console.info("Signed out") ;
      }
    },

    "Application": Ki.State.design({

      enterState: function() {

        // document.title delegated to state Messages

        // uses the same main pane as Sign Out, currently
        var pane = OI.bodyPage.get('mainPane') ;
        if (!pane.get('isAttached')) pane.append() ;
      },

      openReceipts: function() {
        if (CoreOI.get('user').subscribesTo("ParsingService")) {
          window.open('/receipts', '_self') ;
        } else {
          CoreOI.makeComingSoonFlash() ;
        }
      },

      openAdmin: function() {
        window.open('/admin', '_self') ;
      },

      makeNewInvitation: function() {
        window.open('/invitations/new', '_blank', "height=430,width=796,status=no") ;
      },

      openHelp: function() {
        window.open('http://help.otherinbox.com/', '_blank') ;
      },

      // MENTORS
      // This correct state?  Figured it can go into application state.
      undo: function() {
         alert("OI.undo() calls the statechart but isn't yet implemented. Skipping.") ;
         return ;
        // TODO get undo manager working again, preferably use the built-in manager not our custom one
         CoreOI.undo() ;
      },

      // oldfartdeveloper: not implemented yet in OI.runningStatechart
      flushRecords: function() {
        // MENTORS
        // I'm letting CoreOI.flushRecords have a go at this; see what happens.
//        alert("OI.flushRecords() is statechart-enabled. Skipping.") ;
//        return ;

        CoreOI.flushRecords() ;
      },

      'didBecomeFirstResponder': function(view) {
        // switch states here based on view
        // alert("runningStatechart didBecomeFirstResponder: " + view.get('layerId'));
        var viewName = view.get('layerId');
        switch(viewName) {
          case 'mailbox-list':
            this.gotoState('MailboxSelected');
            break;
          case 'message-list':
            this.gotoState('MessageSelected');
            break;
          default:
            alert("didBecomeFirstResponder doesn't know how to handle view " + viewName);
        }
      },

      initialSubstate: 'Messages',

      "Messages": Ki.State.design({

        enterState: function() {
          // document.title is handled by the updateChrome() method:
          OI.updateChrome() ; // make sure it runs when we switch here
        },

        newMailbox: function() {
          window.open('/mailboxes/new', '_blank') ;
        },

        initialSubstate: 'Focus',

        "Focus": Ki.State.design({

          openMessage: function() {
            if (OI.messagesController.get('hasSingleSelection')) {
              var msg = OI.messagesController.get('selection').firstObject() ;
              window.open(msg.get('s3_html_url'), '_blank') ;
              // MENTORS
              // I hope that window.open above causes a state transition; otherwise
              // I'm concerned about a dead statechart.
            }
          },

          markAllAsRead: function() {
            var selection = SC.SelectionSet.create() ;
            var messages = OI.mailboxController.get('messages') ;
            messages.forEach(function(message, index) {
              if (message.get('isUnread')) {
                selection.add(messages, index, 1) ;
              }
            });
            if (selection.get('length') > 0) {

              // MENTORS
              // Should following be CoreOI or OI?
              CoreOI.markSelectedMessagesAsRead(selection, YES) ;
            }
          },

          markAllAsUnread: function() {
            var selection = SC.SelectionSet.create() ;
            var messages = OI.mailboxController.get('messages') ;
            messages.forEach(function(message, index) {
              if (!message.get('isUnread')) {
                selection.add(messages, index, 1) ;
              }
            });
            if (selection.get('length') > 0) {
              CoreOI.markSelectedMessagesAsRead(selection, NO) ;
            }
          },

          markSelectedAsRead: function() {
            var selection = SC.SelectionSet.create() ;
            var messages = OI.mailboxController.get('messages') ;
            OI.messagesController.get('selection').forEach(function(message, index) {
              if (message.get('isUnread')) {
                selection.add(messages, index, 1) ;
              }
            });
            if (selection.get('length') > 0) {
              CoreOI.markSelectedMessagesAsRead(selection, YES) ;
            }
          },

          markSelectedAsUnread: function() {
            var selection = SC.SelectionSet.create() ;
            var messages = OI.mailboxController.get('messages') ;
            OI.messagesController.get('selection').forEach(function(message, index) {
              if (!message.get('isUnread')) {
                selection.add(messages, index, 1) ;
              }
            });
            if (selection.get('length') > 0) {
              CoreOI.markSelectedMessagesAsRead(selection, NO) ;
            }
          },

          deleteAll: function() {
            var selection = SC.SelectionSet.create() ;
            var messages = OI.mailboxController.get('messages') ;
            selection.add(messages, 0, messages.get('length')) ;
            if (selection.get('length') > 0) {
              CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.DELETED_FOLDER_ID) ;
            }            
          },

          deleteSelected: function() {
            var selection = OI.messagesController.get('selection') ;
            if (selection.get('length') > 0) {
              CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.DELETED_FOLDER_ID) ;
            }
          },

          blockAll: function() {
            var selection = OI.mailboxesController.get('selection') ;
            if (selection.get('length') === 1) {
              CoreOI.markMailboxAsBlocked(selection.firstObject(), YES) ;
            }
          },

          // MENTORS
          // The following was commented out originally; I uncommented it.
          // I'll see if it works or not.
          unblockAll: function() {
            var selection = OI.mailboxesController.get('selection') ;
            if (selection.get('length') === 1) {
              CoreOI.markMailboxAsBlocked(selection.firstObject(), NO) ;
            }
          },

          moveToInbox: function() {
            var selection = OI.messagesController.get('selection') ;
            if (selection.get('length') > 0) {
              CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.INBOX_FOLDER_ID) ;
            }
          },

          compose: function() {
            if (OI.messagesController.get('hasSingleSelection')) {
              var msg = OI.messagesController.get('selection').firstObject() ;
              window.open('/messages/new?reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
            } else {
              window.open('/messages/new', '_blank') ;
            }
          },

          reply: function() {
            if (OI.messagesController.get('hasSingleSelection')) {
              var msg = OI.messagesController.get('selection').firstObject() ;
              window.open('/messages/new?reply=true&reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
            }
          },

          forward: function() {
            if (OI.messagesController.get('hasSingleSelection')) {
              var msg = OI.messagesController.get('selection').firstObject() ;
              window.open('/messages/new?forward=true&reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
            }
          },

          saveSelected: function() {
            var selection = OI.messagesController.get('selection') ;
            if (selection.get('length') > 0) {
              CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.SAVED_FOLDER_ID) ;
            }            
          },

          viewAsPlainText: function() {
            if (OI.messagesController.get('hasSingleSelection')) {
              var msg = OI.messagesController.get('selection').firstObject() ;
              window.open('/messages/%@/plain'.fmt(msg.get('guid')), '_blank') ;
            }
          },

          initialSubstate: 'FocusMailboxes',

          "FocusMailboxes": Ki.State.design({

            enterState: function() {
              OI.bodyPage.get('mailboxList').becomeFirstResponder() ;
            },

            initialSubstate: 'ExamineFolderMailboxes',

            /**
             * Transitional state
             */
            "ExamineFolderMailboxes": Ki.State.design({

              enterState: function() {
                  var mailboxes = OI.folderController.get('mailboxes') ;
                  if (!mailboxes) {
                     this.gotoState('LoadingMessages') ; // we're loading for sure!
                  } else {
                     if (mailboxes.get('length') === 0) {
                       if (mailboxes.get('queryKey').get('isLoading')) {
                         this.goState('LoadingMessages') ;
                       } else {
                         this.goState('FolderHasNoMailboxes') ;
                       }
                     } else {
                       var guid = this.folderController.get('guid') ;
                       var sel = this.selectedMailbox[guid] ;
                       if (sel && mailboxes.indexOf(sel) !== -1) {
                         // use previous selection
                         OI.bodyPage.get('mailboxList').select(sel, NO) ;
                       } else {
                         // select the first mailbox (and remember that we did)
                         this.selectedMailbox[guid] = mailboxes.firstObject() ;
                         OI.bodyPage.get('mailboxList').select(0, NO) ;
                       }
                       this.goState('MailboxSelected') ;
                     }
                  }
              }

            }),

            "LoadingMailboxes": Ki.State.design({

              enterState: function() {
                console.info("State 'E2' (LoadingMailBoxes) not implemented.") ;
              }

            }),

            "FolderHasNoMailboxes": Ki.State.design({

              enterState: function() {
                alert("State 'E3' (FolderHasNoMailboxes) not implemented.") ;
              }

            }),

            "MailboxSelected": Ki.State.design({

              enterState: function() {
                this.gotoState('ExamineMailboxMessages') ;
              }

            })

          }),

          "FocusMessages": Ki.State.design({

            enterState: function() {
              // alert("entering State 'D2' (Focus>Messages)" ;
              OI.bodyPage.get('messageList').becomeFirstResponder() ;
            },

            collectionViewSelectionForProposedSelection: function(view, sel) {
              if (view === OI.bodyPage.get('messageList')) {
                if (sel.get('length') === 1) {
                  var obj = sel.firstObject() ;
                  if (obj.get('isUnread')) {
                      CoreOI.markSelectedMessagesAsRead(sel, YES) ;
                  }
                }
              }
              return sel ; // always allow selections
            },

            initialSubstate: 'ExamineMailboxMessages',

            "ExamineMailboxMessages": Ki.State.design({

              enterState: function() {
                var messages = OI.mailboxController.get('messages') ;
                // MENTORS
                // I don't find a 'queryKey' property in the mailboxController,
                // so I'm dropping the clause.  What is the meaning of 'queryKey'?
//                if (!messages || messages.get('queryKey').get('isLoading')) {
                if (!messages) {
                   this.goState('LoadingMessages') ; // we're loading for sure!
                } else {
                   var guid = OI.mailboxController.get('guid') ;
                   if (this.prefetch) {
                     if (OI.mailboxController.get('unreadCount') === 0) {
                       throw new Error("prefetch should be NO since mailbox %@ has no unread messages".fmt(guid)) ;
                     }
                     // set the previous selection to the first unread message, then select it
                     var idx, obj, len = messages.get('length') ;
                     for (idx=0; idx<len; ++idx) {
                       obj = message.objectAt(idx) ;
                       if (obj.get('isUnread')) break ;
                     }
                     if (idx === len) { // didn't find one but should have
                       throw new Error("mailbox %% unreadCount does not match count of unread messages".fmt(guid)) ;
                     }
                     var sel = [messages[idx]] ;
                     this.selectedMessages[guid] = sel ; // save as previous selection
                     OI.bodyPage.get('messageList').select(idx, NO) ;
                   } else if (OI.bodyPage.getPath('messageList.selection.length') === 0) {
                     var sel = this.selectedMessages[guid] ;
                     if (sel) {
                       var newSel = [], idxSet = SC.IndexSet.create(),
                           idx, obj, len = sel.get('length') ;
                       for (idx=0; idx<len; ++idx) {
                         obj = sel[idx] ;
                         if (messages.indexOf(obj) !== -1) {
                           newSel.push(obj) ;
                           idxSet.add(idx, 1) ;
                         }
                       }
                       if (newSel.length > 0) {
                         this.selectedMessages[guid] = newSel ;
                         OI.bodyPage.get('messageList').select(idxSet, NO) ;
                       } else {
                         this.selectedMessages[guid] = [messages.firstObject()] ;
                         OI.bodyPage.get('messageList').select(0, NO) ;
                       }
                     } else {
                       this.selectedMessages[guid] = [messages.firstObject()] ;
                       OI.bodyPage.get('messageList').select(0, NO) ;
                     }
                     this.goState('MessageSelected') ;
                   } else {
                     var sel = OI.bodyPage.getPath('messageList.selection') ;
                     var newSel = [] ;
                     sel.forEach(function(obj) {
                       newSel.push(obj) ;
                     });
                     this.selectedMessages[guid] = newSel ;
                     // objects are already selected in the UI
                     this.goState('MessageSelected') ;
                   }
                }
              }

            }),

            "LoadingMessages": Ki.State.design({

              enterState: function() {
                console.info("State 'F2' (LoadingMessages) not implemented.") ;
              }

            }),

            "NoSelection": Ki.State.design({

              enterState: function() {
                alert("State 'F3' (NoSelection) not implemented.") ;
              }

            }),

            "MessageSelected": Ki.State.design({

              enterState: function() {
                // alert("MessageSelected not implemented");
              },

              // MENTORS
              // The arguments don't match the call from body.js.  Any idea
              // what they should be?
              tag: function(tag, enable) {
                alert("OI.tag() is not statechart-enabled. Skipping.") ;
                return ;

                var sel = OI.messagesController.get('selection');
                if (!sel || sel.get('length') < 1) { return; }

                var method = enable ? "post" : "delete";

                var ids = sel.map(function(msg) { return msg.get('guid'); }).join(',');
                OI._batchUpdateMessages({ url: OI.TAG_URL.fmt(ids), tag: tag, method: method });
              }


            })

          })

        }),

        "Reload": Ki.State.design({

          enterState: function() {
            alert("State 'C2' (Reload) not implemented.") ;
          }

        }),

        "Error": Ki.State.design({

          enterState: function() {
            alert("State 'C3' (Error) not implemented.") ;
          }

        }),

        "MailboxDrag": Ki.State.design({

          enterState: function() {
            alert("State 'C4' (Mailbox) (drag) not implemented.") ;
          }

        }),

        "MessagesDrag": Ki.State.design({

          enterState: function() {
            alert("State 'C5' (Messages) (drag) not implemented.") ;
          }

        })


      }),

      "Receipts": Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Receipts".loc() ;
          alert("State 'B2' (Receipts) not implemented.") ;
        }

      }),

      "Coupons": Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Receipts".loc() ;
          alert("State 'B3' (Coupons) not implemented.") ;
        }

      }),

      "Calendar": Ki.State.design({

        enterState: function() {
          document.title = "_OtherInbox - Calendar".loc() ;
          alert("State 'B4' (Calendar) not implemented.") ;
        }

      })

    }),

    "SignOut": Ki.State.design({

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
