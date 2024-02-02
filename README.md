# SELECT * FROM interesting

_For NICAR 2024_

## About

### Too much data and not enough time

The course description:

> Ever found yourself drowning in a sea of data with editors circling like sharks? You're not alone. In this interactive session, Wall Street Journal data people John West and Rob Barry will dive into a machine learning concept called embeddings, which are at the heart of the current AI craze. Using free and open source tools, we’ll show you how to use this technology to keep afloat in your ocean of unstructured images and text.

### About your instructors

**Rob Barry**

> Rob Barry is an investigative reporter and editor at The Wall Street _Journal_. He helps lead the newspaper's data team, a group of reporters who specialize in computer programming and data analysis.
>
> Rob has reported on topics including nation-state hacking campaigns and influence operations, the unintended consequences in the fight against terror-finance, killings by police, doctors who bill Medicare millions for esoteric procedures, insider trading, foreign and domestic elections, stockbrokers and aviation safety.
>
> He has won three Gerald Loeb Awards, and contributed to a series of stories detailing Medicare overbilling and fraud which was awarded the Pulitzer Prize for Investigative Reporting in 2015. Previously, he worked at the Miami _Herald_, where his work on death and neglect in Florida's assisted living facilities was a finalist for the Pulitzer Prize in Public Service.

**John West**

> John West is a writer and technologist, currently reporting the news with code at the Wall Street _Journal_, where he works as the Lead Technologist in the R&D laboratory. His work has won a Loeb, a Philip Meyer, and two New York Press Club awards—and a finalist for the 2022 Pulitzer prize in explanatory reporting and the winner of the 2023 Pulitzer prize for investigative reporting.
>
> His first book, _Lessons and Carols_ was published in May of 2023 by Wm. B. Eerdmans. Previously, he worked as a researcher at the Laboratory for Social Machines at the MIT Media Lab and its associated nonprofit, Cortico, and as a software engineer at the digital publication, _Quartz_.
>
> He holds an MFA in writing from Bennington College and degrees in philosophy and music performance from Oberlin College and Conservatory.

## Installation

For those of you actually at NICAR, you can safely ignore this. If you're not in the room, though, you'll need to run these steps.

Make sure you've got Git, Python v3.11, and Node v20 installed.

Next, clone and install this repository

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm install
```

## Getting the data.

(_N.B._: If you're at NICAR, you shouldn't need to do this.)

You can scrape everything you need in about an hour.

```bash
poetry shell
jupyter notebook
```

Now, run the `SCRAPE` notebook in its entirety.

## Tagging data.

We've already tagged a couple hundred images, but more is more and more is better.

```bash
npm run dev -- --open
```

This will open the Svelte app that powers the tagging (and visualization) components. Feel free to tag away.

## Classifying data.

```bash
poetry shell
jupyter notebook
```

Now, run the `CLASSIFY` notebook in its entirety.

Finally, you can open back up the Node app to see your results!
