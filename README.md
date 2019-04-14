# 🧜‍♀️ Mermrender

RESTful rendering pipeline for generating sequence and UML diagrams using Mermaid to embed in Github readmes, Markdown docs and more!

![Mermaid](https://mermaidjs.github.io/images/header.png)
Credit: https://mermaidjs.github.io/

### Setup in VSCode
Check out this awesome guide for setting up diagram rendering within VSCode: https://quintussential.com/archive/2017/12/10/Diagraming-with-Mermaid/

### Motivation 

> Github doesn't support rendering Mermaid diagrams in their Markdown editor. Mermaid is a powerful tool that uses a well-defined schema to then interpret diagrams into an SVG. The idea of this tool is to allow embedding images dynamically via a REST endpoint to add UML/Sequence diagrams into your documentation/readmes/markdown files easily, whether the editor supports Mermaid or not. 

### Usage

#### Generate the diagram code
```
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!
```

> You can edit and render them live on this website: https://mermaidjs.github.io/mermaid-live-editor/

#### Escape the diagram to encode it
Next, you need to run it through an escaper like the following: https://www.freeformatter.com/java-dotnet-escape.html#ad-output

#### Encode the escaped diagram
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
    "encoded_diagram": "c2VxdWVuY2VEaWFncmFtDQogICAgcGFydGljaXBhbnQgQWxpY2UNCiAgICBwYXJ0aWNpcGFudCBCb2INCiAgICBBbGljZS0-PkpvaG46IEhlbGxvIEpvaG4sIGhvdyBhcmUgeW91Pw0KICAgIGxvb3AgSGVhbHRoY2hlY2sNCiAgICAgICAgSm9obi0-PkpvaG46IEZpZ2h0IGFnYWluc3QgaHlwb2Nob25kcmlhDQogICAgZW5kDQogICAgTm90ZSByaWdodCBvZiBKb2huOiBSYXRpb25hbCB0aG91Z2h0cyA8YnIvPnByZXZhaWwuLi4NCiAgICBKb2huLS0-PkFsaWNlOiBHcmVhdCENCiAgICBKb2huLT4-Qm9iOiBIb3cgYWJvdXQgeW91Pw0KICAgIEJvYi0tPj5Kb2huOiBKb2xseSBnb29kIQ"
}
```

We will simply issue a get with this information embedded in the URL `http://localhost:3000/diagram/c2VxdWVuY2VEaWFncmFtDQogICAgcGFydGljaXBhbnQgQWxpY2UNCiAgICBwYXJ0aWNpcGFudCBCb2INCiAgICBBbGljZS0-PkpvaG46IEhlbGxvIEpvaG4sIGhvdyBhcmUgeW91Pw0KICAgIGxvb3AgSGVhbHRoY2hlY2sNCiAgICAgICAgSm9obi0-PkpvaG46IEZpZ2h0IGFnYWluc3QgaHlwb2Nob25kcmlhDQogICAgZW5kDQogICAgTm90ZSByaWdodCBvZiBKb2huOiBSYXRpb25hbCB0aG91Z2h0cyA8YnIvPnByZXZhaWwuLi4NCiAgICBKb2huLS0-PkFsaWNlOiBHcmVhdCENCiAgICBKb2huLT4-Qm9iOiBIb3cgYWJvdXQgeW91Pw0KICAgIEJvYi0tPj5Kb2huOiBKb2xseSBnb29kIQ`

The server will return a `png` that you can directly embed into your README:
![](https://i.imgur.com/6VG2JWc.png)

### Additional Options
Add the following optional query parameters to add custom dimensions to your images:

`http://localhost:5555/mermaid/render?width=500&height=300&...`

The dimension units will be assumed as pixels. 

