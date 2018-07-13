# OOP ORM

This is a project designed to get you to write your own simple ORM.

## Installation

1. Fork/clone

1. `npm install`

1. `createdb oop_orm_dev && createdb oop_orm_test`

1. `npm run migrate`

1. `npm run seed`

1. `npm run test`

## Description

For this exercise you will _only_ be creating the Model for a **Theatre**. Theatres have a `name` and `address` field outside of all the usual stuff. You will be writing your model so that it has the following static and instance methods.

**GET ALL**
```js
const theatres = await Theatre.all()
// [ { ... }, { ... }, { ... } ]
```

**GET ONE**
```js
const theatres = await Theatre.find(1)
// { ... }
```

**CREATE**
```js
const theatre = new Theatre({ name: 'My Theatre', address: '123 Main Street' })
await theatre.save()
// { id: xx, name: 'My Theatre', address: '123 Main Street' }
```

**UPDATE**
```js
const theatre = await Theatre.find(1)
theatre.name = 'My New Name'
await theatre.save()
// { id: 1, name: 'My New Name', ... }
```

**DESTROY**
```js
const theatre = await Theatre.find(1)
await theatre.destroy()
// { id: 1, ... }
```
