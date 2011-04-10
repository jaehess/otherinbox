// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {

  // MENTORS
  // What state does this happen in?  Or can I just put it at the top
  // since by definition it's only invoked when the appropriate state(s)
  // are current?  Seems like it would be prudent to find the lowest common
  // state.  I'm guessing state 'D2' (Focus>Messages) would be the appropriate
  // state to implement this tag in.
  tag: function(tag, enable) {
    alert("OI.tag() is not statechart-enabled. Skipping.") ;
    return ;
    
    var sel = OI.messagesController.get('selection');
    if (!sel || sel.get('length') < 1) { return; }
    
    var method = enable ? "post" : "delete";
    
    var ids = sel.map(function(msg) { return msg.get('guid'); }).join(',');  
    OI._batchUpdateMessages({ url: OI.TAG_URL.fmt(ids), tag: tag, method: method });
  },

  // oldfartdeveloper: not implemented yet in OI.runningStateChart
  flushRecords: function() {
    alert("OI.flushRecords() is not statechart-enabled. Skipping.") ;
    return ;
    
    CoreOI.flushRecords() ;
  },

  // MENTORS
  // Is it a good idea to keep this core_actions class and simply delegate the action
  // to the state chart as I've done?  Or can the view directly access the statechart?
  openMessage: function() {
    OI.runningStateChart.sendEvent('openMessage');
  },
  
  markAllAsRead: function() {
    OI.runningStateChart.sendEvent('markAllAsRead');
  },
  
  markAllAsUnread: function() {
    OI.runningStateChart.sendEvent('markAllAsUnread');
  },
  
  markSelectedAsRead: function() {
    OI.runningStateChart.sendEvent('markSelectedAsRead');
  },
  
  markSelectedAsUnread: function() {
    OI.runningStateChart.sendEvent('markSelectedAsUnread');
  },
  
  deleteAll: function() {
    OI.runningStateChart.sendEvent('deleteAll');
  },
  
  deleteSelected: function() {
    OI.runningStateChart.sendEvent('deleteSelected');
  },
  
  blockAll: function() {
    OI.runningStateChart.sendEvent('blockAll');
  },
  
  unblockAll: function() {
    OI.runningStateChart.sendEvent('unblockAll');
  },
  
  moveToInbox: function() {
    OI.runningStateChart.sendEvent('moveToInbox');
  },
  
  compose: function() {
    OI.runningStateChart.sendEvent('compose');
  },
  
  reply: function() {
    OI.runningStateChart.sendEvent('reply');
  },
  
  forward: function() {
    OI.runningStateChart.sendEvent('forward');
  },
  
  openMessages: function() {

    // MENTOR
    // Am counting on initSubstate() to descend to the
    // final substate 'ExamineFolderMailboxes'.  Is this a good idea,
    // or should I directly go to state 'ExamineFolderMailboxes' and
    // count on Ki to descend and run through any functionality in the ExamineFolderMailboxes'
    // parents' initial substates?
    OI.runningStateChart.gotoState('Focus');
  },
  
  openCalendar: function() {
    OI.runningStateChart.sendEvent('openCalendar');
  },
  
  openReceipts: function() {
    OI.runningStateChart.sendEvent('openReceipts');
  },
  
  openSettings: function() {
    OI.runningStateChart.sendEvent('openSettings');
  },
  
  saveSelected: function() {
    OI.runningStateChart.sendEvent('saveSelected');
  },
  
  viewAsPlainText: function() {
    OI.runningStateChart.sendEvent('viewAsPlainText');
  },
  
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
  
  newMailbox: function() {
    OI.runningStateChart.sendEvent('newMailbox');
  },
  
  openAdmin: function() {
    OI.runningStateChart.sendEvent('openAdmin');
  },
  
  makeNewInvitation: function() {
    OI.runningStateChart.sendEvent('makeNewInvitation');
  },
  
  openHelp: function() {
    OI.runningStateChart.sendEvent('openHelp');
  }
  
  // undo: function() {
  //   alert("OI.undo() is not statechart-enabled. Skipping.") ;
  //   return ;
  //   
  //   CoreOI.undo() ;
  // }
  
});
