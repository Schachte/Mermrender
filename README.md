# 🧜‍♀️ Mermrender

RESTful rendering pipeline for generating sequence and UML diagrams using Mermaid to embed in Github readmes, Markdown docs and more! Mermrender uses Mermaid.JS and Mermaid CLI under the hood. 

> Feel free to contribute by making a pull request!

> Maintainer: code@ryan-schachte.com

![Mermaid](https://mermaidjs.github.io/images/header.png)
Credit: https://mermaidjs.github.io/

Run Mermrender in Gitpod, a free online dev environment for GitHub:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Schachte/Mermrender)

### Setup in VSCode
Check out this awesome guide for setting up diagram rendering within VSCode: https://quintussential.com/archive/2017/12/10/Diagraming-with-Mermaid/

### Motivation 

> Github doesn't support rendering Mermaid diagrams in their Markdown editor. Mermaid is a powerful tool that uses a well-defined schema to then interpret diagrams into an SVG. The idea of this tool is to allow embedding images dynamically via a REST endpoint to add UML/Sequence diagrams into your documentation/readmes/markdown files easily, whether the editor supports Mermaid or not. 

### Demo
![demo](https://github.com/Schachte/Mermrender/blob/master/demogif.gif)

### Usage

#### 1) Generate the diagram code with Mermaid OR PlantUML
```
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!
```
or 
```
@startuml
object Object01
object Object02
object Object03
object Object04
object Object05
object Object06
object Object07
object Object08

Object01 <|-- Object02
Object03 *-- Object04
Object05 o-- "4" Object06
Object07 .. Object08 : some labels
@enduml
```

> You can edit and render them live on this website: https://mermaidjs.github.io/mermaid-live-editor/

#### 2) Escape the diagram to encode it
Next, you need to run it through an escaper like the following: https://www.freeformatter.com/java-dotnet-escape.html#ad-output

#### 3) Generate the image link to embed
Send a `POST` request to `http://localhost:3000/encode/plantuml` or `http://localhost:3000/encode/mermaid` depending on the type with a `diagram` key in the body with the above escaped diagram:

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

#### Markdown
`![alt_caption](http://localhost:3000/diagram/2VxdWVuY2VEaWF)`

#### HTML
`<img src="http://localhost:3000/diagram/2VxdWVuY2VEaWF"/>`

#### BBCode (Forums)
`[img]http://localhost:3000/diagram/2VxdWVuY2VEaWF[/img]`

![](https://i.imgur.com/6VG2JWc.png)

### Additional Options
Add the following optional query parameters to add custom dimensions to your images:

(Not yet implemented)

# How To Run

1) `npm i` to install dependencies
2) `node index.js`
3) `sudo npm install -g node-plantuml`
4) `sudo npm install -g mermaid.cli`

or run Mermrender in Gitpod, a free online dev environment for GitHub:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Schachte/Mermrender)
