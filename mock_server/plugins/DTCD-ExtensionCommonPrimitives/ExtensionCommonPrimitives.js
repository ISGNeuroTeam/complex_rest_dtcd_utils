var img$B = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.001 512.001' style='enable-background:new 0 0 512.001 512.001%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M506.143%2c5.859c-7.811-7.811-20.475-7.811-28.285%2c0l-472%2c472c-7.811%2c7.811-7.811%2c20.474%2c0%2c28.284 c3.905%2c3.906%2c9.024%2c5.858%2c14.142%2c5.858s10.237-1.953%2c14.143-5.858l472-472C513.954%2c26.333%2c513.954%2c13.67%2c506.143%2c5.859z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive$2 {
  static getPrimitiveInfo() {
    return {
      title: 'Связь',
      name: 'SimpleEdge',
      groups: ['Связи'],
      icon: img$B,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleEdge();
    instance.style = new this.yfiles.PolylineEdgeStyle();
    return instance;
  }
}

var img$A = "data:image/svg+xml,%3csvg id='%d0%a1%d0%bb%d0%be%d0%b9_1' data-name='%d0%a1%d0%bb%d0%be%d0%b9 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 485 485'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23fbb03b%3b%7d%3c/style%3e%3c/defs%3e%3crect class='cls-1' width='485' height='485' rx='242.5'/%3e%3c/svg%3e";

class ObjectModelPrimitive$1 {
  static getPrimitiveInfo() {
    return {
      title: 'Узел математики',
      name: 'MathOperation',
      groups: ['Математические узлы'],
      icon: img$A,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleNode();
    instance.style = new this.yfiles.ShapeNodeStyle({
      shape: this.yfiles.ShapeNodeShape.ELLIPSE,
      stroke: 'rgb(0, 0, 30)',
      fill: 'rgb(255, 140, 70)',
    });
    instance.layout = new this.yfiles.Rect(0, 0, 40, 40);
    instance.tag = {
      properties: {
        mathField: {
          expression: '',
          type: 'expression',
        },
      },
    };
    return instance;
  }
}

var img$z = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 5.7H11.4V8.4H12.2V5.7H13.5L11.8 4L10.1 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$y = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 5.7H4.3V8.4H5.1V5.7H6.4L4.7 4L3 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 5.7H18.3V8.4H19.1V5.7H20.4L18.7 4L17 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$x = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 5.7H4.3V8.4H5.1V5.7H6.4L4.7 4L3 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M10 5.7H11.3V8.4H12.1V5.7H13.4L11.7 4L10 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 5.7H18.3V8.4H19.1V5.7H20.4L18.7 4L17 5.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$w = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$v = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$u = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$t = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$s = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$r = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$q = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$p = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

var img$o = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2300C7BE'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2300C7BE'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2300C7BE'/%3e%3c/svg%3e";

class ObjectModelPrimitive {
  constructor(yFiles, strokeColor, inPortsCount, outPortsCount) {
    this.yfiles = yFiles.default;
    this.strokeColor = strokeColor;
    this.inPortsCount = inPortsCount;
    this.outPortsCount = outPortsCount;
  }

  create() {
    const {
      SimpleNode,
      ShapeNodeStyle,
      Rect,
      Font,
      MarkupLabelStyle,
      HorizontalTextAlignment,
      TextWrapping,
    } = this.yfiles;

    const font = new Font('"Segoe UI", Arial', 12);
    const customLabelStyle = new MarkupLabelStyle({
      font: font,
      horizontalTextAlignment: HorizontalTextAlignment.LEFT,
      wrapping: TextWrapping.WORD_ELLIPSIS,
      insets: [20, 20],
    });

    const instance = new SimpleNode();
    instance.style = new ShapeNodeStyle({
      shape: 'round-rectangle',
      stroke: `4px ${this.strokeColor}`,
      fill: '#fff',
    });
    instance.layout = new Rect(0, 0, 294, 148);
    instance.tag = {
      properties: {
        testField: {
          expression: '',
          type: 'expression',
        },
      },
      initPorts: [],
    };

    for (let i = 0; i < this.inPortsCount; i++) {
      instance.tag.initPorts.push({
        primitiveName: `inPort${i + 1}`,
        type: 'IN',
        portPosition: {
          x:
            this.inPortsCount === 1
              ? 0.5
              : this.inPortsCount === 2
              ? [0.2, 0.8][i]
              : [0.2, 0.5, 0.8][i],
          y: 1.02,
        },
        properties: {
          status: {
            expression: `let portOwner = graph.ports.find(port => port.tag.primitiveID === primitiveID).owner;
let inEdges = graph.inEdgesAt(portOwner).filter(edge => edge.targetPort.tag.primitiveID === primitiveID).toArray()
if (inEdges.length < 1) ''
else {
eval(inEdges[0].sourcePort.tag.primitiveID).status
}`,
            type: 'expression',
          },
        },
      });
    }

    for (let i = 0; i < this.outPortsCount; i++) {
      instance.tag.initPorts.push({
        primitiveName: `outPort${i + 1}`,
        type: 'OUT',
        portPosition: {
          x:
            this.outPortsCount === 1
              ? 0.5
              : this.outPortsCount === 2
              ? [0.2, 0.8][i]
              : [0.2, 0.5, 0.8][i],
          y: -0.02,
        },
        properties: {
          status: {
            expression: ``,
            type: 'expression',
          },
        },
      });
    }

    instance.tag.customLabelStyle = customLabelStyle;
    return instance;
  }
}

const icons$3 = {icon01: img$z, icon02: img$y, icon03: img$x, icon11: img$w, icon12: img$v, icon13: img$u, icon21: img$t, icon22: img$s, icon23: img$r, icon31: img$q, icon32: img$p, icon33: img$o};
const primitiveClasses$3 = [];

for (let i = 0; i < 4; i++) {
  for (let j = 1; j < 4; j++) {
    const primitiveClass = new Function('RichLabelNode','icon', `
      return class CRLN${i}${j} extends RichLabelNode {
        static getPrimitiveInfo() {
          return {
            title: 'Controlled Rich Label',
            name: 'ControlledRichLabelNode${i}${j}',
            groups: ['ФГК'],
            icon,
          };
        }
      
        constructor(yFiles) {
          const strokeColor = '#00C7BE';
          super(yFiles, strokeColor, ${i}, ${j});
        }
      }
    `)( ObjectModelPrimitive, icons$3[`icon${i}${j}`]);
    
    primitiveClasses$3.push(primitiveClass);
  }
}

var img$n = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 5.7H11.4V8.4H12.2V5.7H13.5L11.8 4L10.1 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$m = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 5.7H4.3V8.4H5.1V5.7H6.4L4.7 4L3 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 5.7H18.3V8.4H19.1V5.7H20.4L18.7 4L17 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$l = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 5.7H4.3V8.4H5.1V5.7H6.4L4.7 4L3 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M10 5.7H11.3V8.4H12.1V5.7H13.4L11.7 4L10 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 5.7H18.3V8.4H19.1V5.7H20.4L18.7 4L17 5.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 19H5.2C4 19 3 18 3 16.8V11.7C3 10.5 4 9.5 5.2 9.5H18.4C19.6 9.5 20.6 10.5 20.6 11.7V16.8C20.5 18 19.5 19 18.3 19ZM5.2 10.5C4.5 10.5 4 11 4 11.7V16.8C4 17.5 4.5 18 5.2 18H18.4C19.1 18 19.6 17.5 19.6 16.8V11.7C19.6 11 19.1 10.5 18.4 10.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$k = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$j = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$i = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$h = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$g = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$f = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$e = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$d = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

var img$c = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%23CD5D67'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%23CD5D67'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%23CD5D67'/%3e%3c/svg%3e";

const icons$2 = {icon01: img$n, icon02: img$m, icon03: img$l, icon11: img$k, icon12: img$j, icon13: img$i, icon21: img$h, icon22: img$g, icon23: img$f, icon31: img$e, icon32: img$d, icon33: img$c};
const primitiveClasses$2 = [];

for (let i = 0; i < 4; i++) {
  for (let j = 1; j < 4; j++) {
    const primitiveClass = new Function('RichLabelNode','icon', `
      return class URLN${i}${j} extends RichLabelNode {
        static getPrimitiveInfo() {
          return {
            title: 'Uncontrolled Rich Label',
            name: 'UncontrolledRichLabelNode${i}${j}',
            groups: ['ФГК'],
            icon,
          };
        }
      
        constructor(yFiles) {
          const strokeColor = '#CD5D67';
          super(yFiles, strokeColor, ${i}, ${j});
        }
      }
    `)( ObjectModelPrimitive, icons$2[`icon${i}${j}`]);
    
    primitiveClasses$2.push(primitiveClass);
  }
}

var img$b = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$a = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$9 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$8 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$7 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$6 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M10 3.7H11.3V6.4H12.1V3.7H13.4L11.7 2L10 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$5 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$4 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

var img$3 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 19.3H11.4V22H12.2V19.3H13.5L11.8 17.6L10.1 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M3.5 19.3H4.8V22H5.6V19.3H6.9L5.2 17.6L3.5 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M16.6 19.3H17.9V22H18.7V19.3H20L18.3 17.6L16.6 19.3Z' fill='%2332ADE6'/%3e%3cpath d='M10.1 3.7H11.4V6.4H12.2V3.7H13.5L11.8 2L10.1 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M17 3.7H18.3V6.4H19.1V3.7H20.4L18.7 2L17 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M3 3.7H4.3V6.4H5.1V3.7H6.4L4.7 2L3 3.7Z' fill='%2332ADE6'/%3e%3cpath d='M18.3 17H5.2C4 17 3 16 3 14.8V9.7C3 8.5 4 7.5 5.2 7.5H18.4C19.6 7.5 20.6 8.5 20.6 9.7V14.8C20.5 16 19.5 17 18.3 17ZM5.2 8.5C4.5 8.5 4 9 4 9.7V14.8C4 15.5 4.5 16 5.2 16H18.4C19.1 16 19.6 15.5 19.6 14.8V9.7C19.6 9 19.1 8.5 18.4 8.5H5.2Z' fill='%2332ADE6'/%3e%3c/svg%3e";

const icons$1 = {icon11: img$b, icon12: img$a, icon13: img$9, icon21: img$8, icon22: img$7, icon23: img$6, icon31: img$5, icon32: img$4, icon33: img$3};
const primitiveClasses$1 = [];

for (let i = 1; i < 4; i++) {
  for (let j = 1; j < 4; j++) {
    const primitiveClass = new Function('RichLabelNode','icon', `
      return class SRLN${i}${j} extends RichLabelNode {
        static getPrimitiveInfo() {
          return {
            title: 'Step Rich Label',
            name: 'StepRichLabelNode${i}${j}',
            groups: ['ФГК'],
            icon,
          };
        }
      
        constructor(yFiles) {
          const strokeColor = '#32ADE6';
          super(yFiles, strokeColor, ${i}, ${j});
        }
      }
    `)( ObjectModelPrimitive, icons$1[`icon${i}${j}`]);
    
    primitiveClasses$1.push(primitiveClass);
  }
}

var img$2 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 16.8H11.4V19.5H12.2V16.8H13.5L11.8 15.1L10.1 16.8Z' fill='%235856D6'/%3e%3cpath d='M18.3 14.5H5.2C4 14.5 3 13.5 3 12.3V7.2C3 6 4 5 5.2 5H18.4C19.6 5 20.6 6 20.6 7.2V12.3C20.5 13.5 19.5 14.5 18.3 14.5ZM5.2 6C4.5 6 4 6.5 4 7.2V12.3C4 13 4.5 13.5 5.2 13.5H18.4C19.1 13.5 19.6 13 19.6 12.3V7.2C19.6 6.5 19.1 6 18.4 6H5.2Z' fill='%235856D6'/%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 16.8H4.8V19.5H5.6V16.8H6.9L5.2 15.1L3.5 16.8Z' fill='%235856D6'/%3e%3cpath d='M16.6 16.8H17.9V19.5H18.7V16.8H20L18.3 15.1L16.6 16.8Z' fill='%235856D6'/%3e%3cpath d='M18.3 14.5H5.2C4 14.5 3 13.5 3 12.3V7.2C3 6 4 5 5.2 5H18.4C19.6 5 20.6 6 20.6 7.2V12.3C20.5 13.5 19.5 14.5 18.3 14.5ZM5.2 6C4.5 6 4 6.5 4 7.2V12.3C4 13 4.5 13.5 5.2 13.5H18.4C19.1 13.5 19.6 13 19.6 12.3V7.2C19.6 6.5 19.1 6 18.4 6H5.2Z' fill='%235856D6'/%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.1 16.8H11.4V19.5H12.2V16.8H13.5L11.8 15.1L10.1 16.8Z' fill='%235856D6'/%3e%3cpath d='M3.5 16.8H4.8V19.5H5.6V16.8H6.9L5.2 15.1L3.5 16.8Z' fill='%235856D6'/%3e%3cpath d='M16.6 16.8H17.9V19.5H18.7V16.8H20L18.3 15.1L16.6 16.8Z' fill='%235856D6'/%3e%3cpath d='M18.3 14.5H5.2C4 14.5 3 13.5 3 12.3V7.2C3 6 4 5 5.2 5H18.4C19.6 5 20.6 6 20.6 7.2V12.3C20.5 13.5 19.5 14.5 18.3 14.5ZM5.2 6C4.5 6 4 6.5 4 7.2V12.3C4 13 4.5 13.5 5.2 13.5H18.4C19.1 13.5 19.6 13 19.6 12.3V7.2C19.6 6.5 19.1 6 18.4 6H5.2Z' fill='%235856D6'/%3e%3c/svg%3e";

const icons = {icon1: img$2, icon2: img$1, icon3: img};
const primitiveClasses = [];

for (let j = 1; j < 4; j++) {
  const primitiveClass = new Function('RichLabelNode','icon', `
    return class TRLN${j} extends RichLabelNode {
      static getPrimitiveInfo() {
        return {
          title: 'Target Rich Label',
          name: 'TargetRichLabelNode${j}',
          groups: ['ФГК'],
          icon,
        };
      }
    
      constructor(yFiles) {
        const strokeColor = '#5856D6';
        super(yFiles, strokeColor, ${j}, 0);
      }
    }
  `)( ObjectModelPrimitive, icons[`icon${j}`]);
  
  primitiveClasses.push(primitiveClass);
}

// import SimpleNode from './SimpleNode';


var primitives = [
  ObjectModelPrimitive$2,
  ObjectModelPrimitive$1,
  ...primitiveClasses$3,
  ...primitiveClasses$2,
  ...primitiveClasses$1,
  ...primitiveClasses
];

/**
 * @typedef {Object} PluginMeta
 * @property {String} title
 * @property {String} name
 * @property {String[]} actions
 * @property {String[]} events
 * @property {String[]} requirements
 */
class AbstractPlugin {
	/**
	 * Static method of AbstractPlugin class which need to reload!
	 * @static
	 * @returns {PluginMeta}
	 * @return {String} meta.title
	 * @return {String} meta.name
	 * @return {String[]} meta.actions
	 * @return {String[]} meta.events
	 * @return {String[]} meta.dependencies
	 */
	static getRegistrationMeta() {
		throw new Error('Implement the getRegistrationMeta static method!');
	}

	/**
	 * Getting module from dependencies
	 * @method
	 * @param {String} name
	 * @returns {Object[]}
	 */
	getDependence(name) {
		return Application.getDependence(name);
	}

	/**
	 * Getting all extensions for plugin by name
	 * @method
	 * @param {String} name
	 * @return {Object[]}
	 */
	getExtensions(name) {
		return Application.getExtensions(name);
	}

	/**
	 * Getting list of all awailable panels
	 * @method
	 * @return {Object[]}
	 */
	getPanels() {
		return Application.getPanels();
	}

	/**
	 * Getting system by name
	 * @method
	 * @param {String} name
	 * @return {Object}
	 */
	getSystem(name) {
		return Application.getSystem(name);
	}

	/**
	 * Installing plugin by name
	 * @method
	 * @param {String} name
	 */
	installPlugin(name, ...args) {
		return Application.installPlugin(name, ...args);
	}

	/**
	 * Uninstall plugin from Application by instance
	 * @method
	 * @param {Object} instance
	 * @returns {Boolean}
	 */
	uninstallPluginByInstance(instance) {
		return Application.uninstallPluginByInstance(instance);
	}

	/**
	 * Uninstall plugin from Application by unique identifier
	 * @method
	 * @param {String} guid Unique identifier of the instance to be uninstalled
	 * @returns {Boolean}
	 */
	uninstallPluginByGUID(guid) {
		return Application.uninstallPluginByGUID(guid);
	}

	/**
	 * Getting instance by guid
	 * @method
	 * @param {String} guid
	 * @returns {Object}
	 */
	getInstance(guid) {
		this.instance.getInstance(guid);
		return this.instance.getInstance(guid);
	}
}

/**
 * @typedef {Object} ExtensionInfo
 * @property {String} plugin
 * @property {*} data
 */
class ExtensionPlugin extends AbstractPlugin {
	/**
	 * @static
	 * @return {ExtensionInfo} information about extension
	 */
	static getExtensionInfo() {
		throw new Error('Implement the getExtensionInfo static method!');
	}
}

class ExtensionCommonPrimitives extends ExtensionPlugin {
  static getRegistrationMeta() {
    return {
      type: 'extension',
      target: ['PrimitiveLibraryPanel', 'LiveDashPanel'],
      title: 'Расширение библиотеки примитивов Common',
      name: 'ExtensionCommonPrimitives',
    };
  }

  static getExtensionInfo() {
    const result = [];
    primitives.forEach(primitive => {
      const primitiveInfo = primitive.getPrimitiveInfo();
      primitiveInfo.extensionName = this.getRegistrationMeta().name;
      primitiveInfo.primitiveName = primitiveInfo.name;
      result.push(primitiveInfo);
    });
    return result;
  }

  constructor() {
    super();

    const yFiles = this.getDependence('yFiles');

    this.primitives = {};
    primitives.forEach(PrimitiveClass => {
      const { name } = PrimitiveClass.getPrimitiveInfo();
      this.primitives[name] = PrimitiveClass.bind(null, yFiles);
    });
  }
}

export { ExtensionCommonPrimitives };
