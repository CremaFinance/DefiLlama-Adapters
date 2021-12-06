Security: 
----------------
- newly-introduced dependencies (packages) need to be discussed broadly before merging
- check for hardcoded addresses - changes of addresses

Issues:
----------------
- assign yourself issue based on your *Skill* and *Time Availability*
- only assign issues to yourself if you're about to start working on them right away
- if you have a review assigned, finish the review/resolve the conversation first before assigning yourself an issue
- if you see a missing label or think that it might have a different duration than labeled, feel free to change the label

Always use labels:
* 💪Skills:
  * React
  * NextJS
  * Typescript
  * CSS/styling
  * web3
  * devops
  * GitHub tools
  * Infrastructure

* ⏰Durations:
  * quick - might take (tens of) minutes to finish
  * medium - might take hours to finish
  * long - might take days to finish

* ❗Priority:
  * high priority
  * medium priority
  * low priority
  * nice to have

Commit Messages:
----------------
- use the present tense ("Add feature" not "Added feature")
- use [GiMoji](https://gitmoji.dev/) (optional)
- using Husky to obligate running at least a eslint pass to commit and jest to push to remote
- implement and use git hooks to enforce commit message structure

Branches:
----------------
* [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

* branch naming convention:
  * main - protected (2 reviews + one from JJ/repe/lucio/aankor)
  * develop - protected (1 review into dev)
  * test
  * feature/{featureName}
  * hotfix/{fixName}

Pull Requests:
----------------
- use the provided PR template
- PR without review assigned is considered a WIP PR and needs a WIP label - every PR has assigned a reviewer AND/OR WIP label
- the last person that resolves the conversation and/or finishes the review (into dev) will merge the PR
- use WIP label to signify PR to not get merged even after an approved review

Reviews:
----------------
* Assign reviews to (for now by order):
 * @phola
 * @AlexStefan
 * @despin

Definition of done:
----------------
- if styling changed, add [PerfectPixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi) addon screenshot into PR's description (video of how to use it [here](https://cdn.discordapp.com/attachments/891973813028413460/900854532811145226/Screen_Recording_2021-10-21_at_23.05.37.mov))
- all PR checks are done before assigning someone to review
- no console warnings or errors
- no merge conflicts
- all reviews needed are approved
