const {TAG} = require("./const");
const Reconciler = require('react-reconciler');
const {
  DefaultEventPriority,
} = require('react-reconciler/constants');
const {comparePrevStylesAndNextStyles} = require("./StyleUtils");
const {createView} = require("./ViewFactory");
const {comparePrePropsAndNextProps} = require("./PropsUtils");

const HostConfig = {
  supportsMutation: true,
  createInstance(type, props, rootContainer, hostContext, internalHandle) {
	console.log(TAG, "createInstance", type, JSON.stringify(props), rootContainer);
	const instance = createView(type, props);
	if (type === "page") {
	  pageStack.push(instance);
	}
	return instance;
  },
  createTextInstance(text, rootContainer, hostContext, internalHandle) {
	console.log(TAG, "createTextInstance", type, rootContainer, hostContext);
  },
  appendInitialChild(parentInstance, child) {
	console.log(TAG, "appendInitialChild", child.name, parentInstance.name);
	parentInstance.addView(child);
  },
  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
	console.log(TAG, "finalizeInitialChildren", instance.name, JSON.stringify(props), rootContainer);
	return false;
  },
  shouldSetTextContent(type, props) {
	// console.log(TAG, "shouldSetTextContent", type, props);
	return false;
  },
  getRootHostContext(rootContainer) {
	// console.log(TAG, "getRootHostContext", rootContainer);
	return global.SkiaUI;
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
	// console.log(TAG, "getChildHostContext", type, rootContainer);
	return parentHostContext;
  },
  getPublicInstance(instance) {
	console.log(TAG, "getPublicInstance", instance);
	return instance;
  },
  prepareForCommit(containerInfo) {
	return null;
  },
  resetAfterCommit(containerInfo) {

  },
  scheduleTimeout(fn, delay) {
	setTimeout(fn, delay);
  },
  cancelTimeout(id) {
	clearTimeout(id);
  },
  supportsMicrotasks: false,
  isPrimaryRenderer: true,
  appendChild(parentInstance, child) {
	console.log(TAG, "appendChild", child.name);
  },
  appendChildToContainer(container, child) {
	console.log(TAG, "appendChildToContainer", container, child.name);
  },
  insertBefore(parentInstance, child, beforeChild) {
	console.log(TAG, "insertBefore", child.name);
  },
  insertInContainerBefore(container, child, beforeChild) {
	console.log(TAG, "insertInContainerBefore", child.name);
  },
  removeChild(parentInstance, child) {
	parentInstance.removeChild(child);
	console.log(TAG, "removeChild", child.name);
  },
  removeChildFromContainer(container, child) {
	console.log(TAG, "removeChildFromContainer", child.name);
  },
  resetTextContent(instance) {
	console.log(TAG, "resetTextContent", instance);
  },
  commitTextUpdate(textInstance, prevText, nextText) {
	console.log(TAG, "commitTextUpdate", textInstance, prevText, nextText);
  },
  commitMount(instance, type, props, internalHandle) {
	console.log(TAG, "commitMount", instance, type, props);
  },
  commitUpdate(instance, type, prevProps, nextProps, internalHandle) {
	// console.log(TAG, "commitUpdate", instance.name, type, JSON.stringify(prevProps), JSON.stringify(nextProps));
	comparePrevStylesAndNextStyles(instance, type, prevProps.style, nextProps.style);
	comparePrePropsAndNextProps(instance, type, prevProps, nextProps);
  },
  hideInstance(instance) {
	console.log(TAG, "hideInstance", instance);
  },
  hideTextInstance(textInstance) {
	console.log(TAG, "hideTextInstance", textInstance);
  },
  unhideInstance(instance, props) {
	console.log(TAG, "unhideInstance", instance, props);
  },
  unhideTextInstance(textInstance, text) {
	console.log(TAG, "unhideTextInstance", textInstance, text);
  },
  clearContainer(container) {
	console.log(TAG, "clearContainer", container);
  },
  maySuspendCommit(type, props) {
	// console.log(TAG, "maySuspendCommit", type);
  },
  preloadInstance(type, props) {
	console.log(TAG, "preloadInstance", type, props);
  },
  startSuspendingCommit() {
	console.log(TAG, "startSuspendingCommit");
  },
  suspendInstance(type, props) {
	console.log(TAG, "suspendInstance", type, props);
  },
  waitForCommitToBeReady() {
	console.log(TAG, "waitForCommitToBeReady");
  },
  resolveUpdatePriority() {
	return DefaultEventPriority;
  },
  getCurrentUpdatePriority() {
	return DefaultEventPriority;
  },
  setCurrentUpdatePriority(priority) {

  },
  detachDeletedInstance(alternate) {
	// console.log(TAG, "detachDeletedInstance");
  }
};

const SkiaUIRenderer = Reconciler(HostConfig);

var ROOT_INDEX = 0;

const containerStack = [];
const pageStack = []

const RendererPublicAPI = {
  render(element) {
	const rootElement = ROOT_INDEX++;
	console.log("SkiaReactApp", "render", rootElement);
	const container = SkiaUIRenderer.createContainer(rootElement, rootElement);
	containerStack.push(container);
	const parentComponent = null;
	SkiaUIRenderer.updateContainer(
		element,
		container,
		parentComponent,
		null
	);
  },
  pop() {
	const container = containerStack.pop();
	console.log("SkiaReactApp", "pop", container);
	if (container) {
	  SkiaUIRenderer.updateContainer(
		  null,
		  container,
		  null,
		  null
	  );
	}
	const page = pageStack.pop();
	if (page) {
	  page.pop(new SkiaUI.EnterExitInfo(0, SkiaUI.innerWidth));
	}
  },
  setBackPressedCallback() {
	SkiaUI.setBackPressedCallback(() => {
	  const container = containerStack.pop();
	  console.log("SkiaReactApp", "backPressed", container);
	  if (container) {
		SkiaUIRenderer.updateContainer(
			null,
			container,
			null,
			null
		);
	  }
	  pageStack.pop();
	});
  }
};

RendererPublicAPI.setBackPressedCallback();

module.exports = RendererPublicAPI;
