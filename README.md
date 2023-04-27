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
function App() { // This needs to be NextJS App Component
    const router = useRouter();
    useScrollRestoration(router);
}
```

**You can also disable the scroll restoration by passing `enabled` property**

```js
function App() { // This needs to be NextJS App Component
    const router = useRouter();
    useScrollRestoration(router, {enabled: false});
}
```

## Peer dependencies

- React 16 or up
- Next 13
