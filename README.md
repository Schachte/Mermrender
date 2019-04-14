# 🧜‍♀️ Mermrender

RESTful rendering pipeline for generating sequence and UML diagrams using Mermaid to embed in Github readmes, Markdown docs and more!

![Mermaid](https://mermaidjs.github.io/images/header.png)
Credit: https://mermaidjs.github.io/

### Motivation 

> Github doesn't support rendering Mermaid diagrams in their Markdown editor. Mermaid is a powerful tool that uses a well-defined schema to then interpret diagrams into an SVG. The idea of this tool is to allow embedding images dynamically via a REST endpoint to add UML/Sequence diagrams into your documentation/readmes/markdown files easily, whether the editor supports Mermaid or not. 

### Usage

Generate a diagram using Mermaid like so:
```
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!
```

You can edit and render them live on this website: https://mermaidjs.github.io/mermaid-live-editor/

Next, you need to base64 encode the diagram using a tool like: https://www.base64encode.org/

This will generate a string of characters like so:
```
c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBBIGFzIEFsaWNlCiAgICBwYXJ0aWNpcGFudCBKIGFzIEpvaG4KICAgIEEtPj5KOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT8KICAgIEotPj5BOiBHcmVhdCE=
```

We will simply issue a get with this information embedded in the URL `http://localhost:5555/mermaid/render?diagram=c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBBIGFzIEFsaWNlCiAgICBwYXJ0aWNpcGFudCBKIGFzIEpvaG4KICAgIEEtPj5KOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT8KICAgIEotPj5BOiBHcmVhdCE=`

The server will return a `png` that you can directly embed into your README:
![](https://i.imgur.com/6VG2JWc.png)

### Additional Options
Add the following optional query parameters to add custom dimensions to your images:

`http://localhost:5555/mermaid/render?width=500&height=300&...`

The dimension units will be assumed as pixels. 

