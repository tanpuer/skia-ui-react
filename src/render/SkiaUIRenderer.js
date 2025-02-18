const TAG = "SkiaUIRenderer";
const Reconciler = require('react-reconciler');
const {type} = require("@testing-library/user-event/dist/type");
const {
  DefaultEventPriority,
} = require('react-reconciler/constants');
const {convertStyles} = require("./StyleUtils");
const {convertProps} = require("./PropsUtils");

const HostConfig = {
  supportsMutation: true,
  createInstance(type, props, rootContainer, hostContext, internalHandle) {
	console.log(TAG, "createInstance", type, JSON.stringify(props), rootContainer);
	if (type === "view") {
	  let view = new global.SkiaUI.View();
	  convertStyles(view, props.style)
	  if (props.onClick) {
		view.setOnClickListener((_view) => {
		  props.onClick();
		});
	  }
	  return view;
	} else if (type === "page") {
	  let page = new global.SkiaUI.Page();
	  convertStyles(page, props.style)
	  page.push(new global.SkiaUI.EnterExitInfo(global.SkiaUI.innerWidth, 0));
	  return page;
	} else if (type === "scroll") {
	  let scrollView = new global.SkiaUI.ScrollView();
	  convertStyles(scrollView, props.style);
	  return scrollView;
	}
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
	console.log(TAG, "shouldSetTextContent", type, props);
	return false;
  },
  getRootHostContext(rootContainer) {
	console.log(TAG, "getRootHostContext", rootContainer);
	return global.SkiaUI;
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
	console.log(TAG, "getChildHostContext", type, rootContainer);
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
	global.SkiaUI.setTimeout(fn, delay);
  },
  cancelTimeout(id) {
	global.SkiaUI.clearTimeout(id);
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
	console.log(TAG, "commitUpdate", instance, type, prevProps, nextProps);
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
	console.log(TAG, "maySuspendCommit", type, JSON.stringify(props));
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

  }
};

const SkiaUIRenderer = Reconciler(HostConfig);

const RendererPublicAPI = {
  render(element, renderDom, callback) {
	const container = SkiaUIRenderer.createContainer(renderDom, "");
	const parentComponent = null;
	SkiaUIRenderer.updateContainer(
		element,
		container,
		parentComponent,
		callback
	);
  }
};

module.exports = RendererPublicAPI;
