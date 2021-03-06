export default class Button {
  private element: HTMLElement;
  private button: HTMLButtonElement;
  private classId: string;
  private serviceId: string;
  private classInfo: any;
  private xButton: HTMLElement;

  /**
   *Creates an instance of Button.
   * @param {string} classId ローカルストレージに保存する際にキーとして使用する講義ID
   * @param {string} serviceId ローカルストレージに保存する際にキーとして使用するサービス名称
   * @memberof Button
   */
  constructor(classId: string, serviceId: string) {
    this.classId = classId;
    this.serviceId = serviceId;

    this.element = document.createElement("div");
    this.element.style.display = "flex";

    this.classInfo = JSON.parse(localStorage.getItem(classId));

    this.button = document.createElement("button");
    this.element.appendChild(this.button);

    if (
      this.classInfo[serviceId] == null ||
      this.classInfo[serviceId] == undefined
    ) {
      //未登録である場合
      this.setStateUnavailable();
    } else {
      this.setStateAvailable();
    }
  }
  /**
   * 構築されたdiv要素を返します
   * @returns {HTMLElement}
   * @memberof Button
   */
  public getElement(): HTMLElement {
    return this.element;
  }

  /**
   * リンクが有効な状態にします
   * @private
   * @memberof Button
   */
  private setStateAvailable() {
    this.button.innerText = this.serviceId + "へ";
    this.button.style.backgroundColor = "lightgreen";
    this.button.onclick = (e) => {
      e.preventDefault();
      const link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.setAttribute("href", this.classInfo[this.serviceId]);
      link.click();
    };

    this.xButton = document.createElement("button");
    this.xButton.appendChild(document.createTextNode("\u274C"));
    this.xButton.onclick = (e) => {
      e.preventDefault();
      this.setStateUnavailable();
      this.xButton.remove();
    };
    this.element.appendChild(this.xButton);
  }
  /**
   * リンクが無効な状態にします
   * @private
   * @memberof Button
   */
  private setStateUnavailable() {
    this.button.innerText = this.serviceId + "登録";
    this.button.style.backgroundColor = "lightgrey";
    this.button.onclick = (e) => {
      e.preventDefault();
      const url = prompt(this.serviceId + "のURLを入力");
      this.classInfo[this.serviceId] = url;
      localStorage.setItem(this.classId, JSON.stringify(this.classInfo));
      this.setStateAvailable();
    };
  }
}
