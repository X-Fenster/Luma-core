# Luma Framework

Luma is a lightweight, modular JavaScript framework designed for the easy creation of modern web applications. It focuses on simplicity and flexibility, providing developers with the essential tools to build clean, efficient, and scalable applications. With built-in features like routing and customizable UI components, Luma enables rapid development without unnecessary complexity. The framework’s minimalist design ensures that it remains lightweight while being highly extensible. Whether you're building small projects or large applications, Luma offers an efficient approach to JavaScript development.

## Features

- **Lightweight**: Minimal file size for fast loading times.
- **Simple API**: Intuitive methods and functions to get started quickly.
- **Cross-browser compatibility**: Works in all modern browsers.

## Installation

Luma can be installed via npm:

```bash
npm install luma-core
```

or via cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/luma-core/dist/luma-core.min.js"></script>
```

## Usage: `defineComponent`

### Importing `defineComponent`

```javascript
import { defineComponent } from "luma-core";
```

### Creating a Component

```javascript
defineComponent("l-card", {
  template: `
        <div class="card">
            <h2>{{ title }}</h2>
            <p>{{ content }}</p>
        </div>
    `,
  styles: `
        .card {
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
            border-radius: 10px;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
        }
    `,
  props: {
    title: "default title",
    content: "default content",
  },
});
```

### Include to HTML

```HTML
<l-card title="Hello World!" content="This is a luma card"></l-card>
```

---

### `defineComponent(name, config);`

Creates a new UI component.

**Parameters:**

- `name`: The name of the component
- `config`: The configuration:

  - `template`: HTML code representing the structure of the element
  - `styles`: CSS code that determines the appearance of the element
  - `props`: A JSON with all the variables of the element.

**Good to know:**

You can include the variables from `props` in the template with `{{ prop }}`.
The value of the variable in the JSON of `props` is the default value if none is specified.

**Important:**

The names of the component must always contain a hyphen, otherwise it could be an HTML element

## Usage: `defineRoute` and `navigateTo`

### Importing `defineRoute` and `navigateTo`

```javascript
import { defineRoute, navigateTo } from "luma-core";
```

### Creating a Route

```javascript
defineRoute("/home", () => {
  `<h1>Home</h1>`;
});
defineRoute("/about", () => {
  `<h1>About</h1>`;
});

navigateTo(window.location.pathname);
```

### Include to HTML

```html
<div id="app"></div>

<a href="/home" onclick="navigateTo('/home', event)">home</a>
<a href="/about" onclick="navigateTo('/about', event)">about</a>
```

---

### `defineRoute(path, function)`

Creates a new route.

**Parameters:**

- `path`: The path to the page
- `function`: The function that decides what is rendered in the div app

**Important:**

The path must begin with a slash.

### `navigateTo(path, event)`

Navigate to the route.

**Parameters:**

- `path`: The path to the route
- `event`: The event for the navigation but it is not required

**Important:**

A div with the id app is required for `navigateTo()`

## Usage: dynamic routes

### Creating a dynamic route

```javascript
defineRoute("/users/:name", (params) => `<h1>Profil von ${params.name}</h1>`);

navigateTo(window.location.pathname);
```

### Include to HTML

```html
<div id="app"></div>

<a href="/user/max" onclick="navigateTo('/user/max', event)">Max' Profil</a>
<a href="/user/lisa" onclick="navigateTo('/user/lisa', event)">Lisas Profil</a>
```

**Good to know:**

The routing system in luma-core allows you to navigate between pages and supports dynamic parameters such as "/user/:id".
When navigateTo('/user/42') is called, the route with the ID 42 is recognized and passed to the corresponding component. The matchRoute()
function compares the URL with defined routes, extracts parameters, and renders the matching page. Using the History API (pushState),
the URL is changed without reloading the page.

## License

MIT License is used for luma-core
