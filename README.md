# Restore scroll position in NextJS

Restores scroll position when navigating back and forth in NextJS.

## Installation

```
yarn add next-restore-scroll-position
```

```
npm i next-restore-scroll-position
```


## Usage
```js
import { useScrollRestoration } from 'next-restore-scroll-position';

function App() { // This needs to be NextJS App Component
    const router = useRouter();
    useScrollRestoration(router);
}
```

**If your app limits content scrolling within a particular DOM element only, rather than allowing normal full window scrolling, you can pass the scrollAreaId property **

scrollAreaId is the id of the element that scrolls. If you have a div with id="divThatScrolls", you would pass scrollAreaId="divThatScrolls"

```js
import { useScrollRestoration } from 'next-restore-scroll-position';

function App() { // This needs to be NextJS App Component
    const router = useRouter();
    useScrollRestoration(router, {scrollAreaId: "divThatScrolls"});
}
```

**You can also disable the scroll restoration by passing `enabled` property**

```js
import { useScrollRestoration } from 'next-restore-scroll-position';

function App() { // This needs to be NextJS App Component
    const router = useRouter();
    useScrollRestoration(router, {enabled: false});
}
```

## Peer dependencies

- React 16 or up
- Next 13
