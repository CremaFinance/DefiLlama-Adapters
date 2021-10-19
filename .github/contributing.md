General: 
----------------
 - keep in mind that we are distributed in different time zones so keep the important discussion asynchronous on GitHub  - else use Discord

Security: 
----------------
- newly introduced dependencies (packages) need to be discussed broadly before merging
- check for hard coded addresses - changes of addresses
- keep third party dependencies up to date. maybe use a tool like https://docs.renovatebot.com/ to make this automated

Issues:
----------------
Assign yourself issue based on your *Skill* and *Time Availability*.
If you have a review assigned, finish the review/resolve the conversation first before assigning yourself an issue.
If you see a missing label or think that it might have a different duration than labeled, feel free to change the label.

Labels:

* 💪Skills:
  * React
  * NextJS
  * Typescript
  * CSS/styling
  * web3
  * devops
  * GitHub actions
  * Infrastructure

* ⏰Durations:
  * quick - might take (tens of) minutes to finish
  * medium - might take hours to finish
  * long - might take days to finish

Commit Messages:
----------------
- Use the present tense ("Add feature" not "Added feature")
- https://gitmoji.dev/
- using Husky to obligate running at least a eslint pass to commit and jest to push to remote
- implement and use git hooks to enforce commit message structure

Branches:
----------------
* [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

* branch naming convention:
  * main - protected (2 reviews + one from JJ/repe/lucio/aankor)
  * develop - protected (2 reviews into dev)
  * test
  * feature/{featureName}
  * hotfix/{fixName}

Pull Requests:
----------------
- use the PR template
- the last person that resolves conversation and/or it makes his review 2nd approved will merge the PR into dev
- run lint fixers to keep code formatting standardized across branches
- notify @JJ-Marinade in #development channel about merging PR with link to it

Reviews:
----------------
* Assign reviews to (for now by order):
 * @uwecerron
 * @phola
 * @despin
 * @AlexStefan
 * @samullman

- start the day with @Orli bot (once setup) and trying to resolve reviews first before you start working on your issues
- if you have too many reviews assigned to yourself and you feel like you won't be able to finish them today, re-assign them someone from the list
- only re-assign a review yourself to someone else not the other way around

Definition of done:
----------------
- If styling changed, add perfectpixel addon screenshot into PR's description
- All PR checks are done before assigning someone to review
- No console warnings or errors
- No merge conflicts

Scrum Stand-ups
----------------
- Set up async stand up options like https://orli.ai/ for tracking progress or roadblocks
