# 🧜‍♀️ Mermrender

RESTful rendering pipeline for generating sequence and UML diagrams using Mermaid to embed in Github readmes, Markdown docs and more! Mermrender uses Mermaid.JS and Mermaid CLI under the hood. 

![Mermaid](https://mermaidjs.github.io/images/header.png)
Credit: https://mermaidjs.github.io/

### Setup in VSCode
Check out this awesome guide for setting up diagram rendering within VSCode: https://quintussential.com/archive/2017/12/10/Diagraming-with-Mermaid/

### Motivation 

> Github doesn't support rendering Mermaid diagrams in their Markdown editor. Mermaid is a powerful tool that uses a well-defined schema to then interpret diagrams into an SVG. The idea of this tool is to allow embedding images dynamically via a REST endpoint to add UML/Sequence diagrams into your documentation/readmes/markdown files easily, whether the editor supports Mermaid or not. 

### Usage

#### 1) Generate the diagram code
```
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!
```

> You can edit and render them live on this website: https://mermaidjs.github.io/mermaid-live-editor/

#### 2) Escape the diagram to encode it
Next, you need to run it through an escaper like the following: https://www.freeformatter.com/java-dotnet-escape.html#ad-output

#### 3) Generate the image link to embed
Send a `POST` request to `localhost:3000/encode` with a `diagram` key in the body with the above escaped diagram:

Example Body:
```
{
"diagram": "sequenceDiagram\r\n    participant Alice\r\n    participant Bob\r\n    Alice->>John: Hello John, how are you?\r\n    loop Healthcheck\r\n        John->>John: Fight against hypochondria\r\n    end\r\n    Note right of John: Rational thoughts <br/>prevail...\r\n    John-->>Alice: Great!\r\n    John->>Bob: How about you?\r\n    Bob-->>John: Jolly good!"
}
```

This will generate a respose:
```
{
    "embed_link": "http://localhost:3000/diagram/2VxdWVuY2VEaWF"
}
```
You can embed the following `embed_link` by using the following syntax:
```
Markdown: ![alt_caption](http://localhost:3000/diagram/2VxdWVuY2VEaWF)
HTML: <img src="http://localhost:3000/diagram/2VxdWVuY2VEaWF"/>
BBCode (Forums): [img]http://localhost:3000/diagram/2VxdWVuY2VEaWF[/img]
```

![](https://i.imgur.com/6VG2JWc.png)

### Additional Options
Add the following optional query parameters to add custom dimensions to your images:

`http://localhost:5555/mermaid/render?width=500&height=300&...`

The dimension units will be assumed as pixels. 

