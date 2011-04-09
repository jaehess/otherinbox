// MENTORS - Am I showing a correct understanding of Other Inbox's statecharts and the states within each statechart?  This is directly extracted from otherinbox/apps/other_inbox/core.js

// Please review the following and let me know where I'm wrong.  It would also be helpful if you indicated if any of them are nested within each other.

// Thanks in advance - oldfartdeveloper
/*

There are 6 independent statecharts:

Main Statechart('A') - 2 states:

1.  Application
2.  SignOut

Toolbar Statechart('B') - 5 states:

1.  Messages
2.  Receipts
3.  Coupons
4.  Calendar
5.  Help (I've added this; tell me whether I need it or not)
6.  Settings (I've added this; tell me whether I need it or not)

Dragging ??? ('C') - 5 states

1.  Focus (same as 'has focus'?)
2.  Reload (what does this do?)
3.  Error
4.  Mailbox drag(ging?)
5.  Message drag(ging?)

Content Type ('D') - 2 states

1.  Mailboxes
2.  Messages

Mailboxes ('E')

1.  Examining Folder for mailboxes (transient)
2.  Loading
3.  Folder has no mailboxes
4.  Mailbox selected

Mailbox ('F')
1.  Examining Mailbox messages (transient)
2.  Loading
3.  No message selected
4.  Message selected

************

Notes: In Mailbox ('F'), doesn't there need to be another state for mailbox has no messages?

*/
