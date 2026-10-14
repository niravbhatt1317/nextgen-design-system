---
'@mtdt/nextgen-design-system': minor
---

`useForm` - one form's values, checks and Save rule, for every form in the library (Kevin, 2026-10-13).

`field(name)` binds an Input or a Select. Save turns on only once something has changed, every required field holds a
value, and no submit is running; typed back to the start it goes off again. A message waits until the field is left or
Save is pressed, rather than appearing while someone is still typing, and a submit with a problem puts focus on the
first field that has one. `required` can be a function of the other values. `reset(values)` makes what was just saved
the new starting point.

Five stories, each isolating one of those rules.
