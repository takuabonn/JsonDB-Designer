import React from "react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">利用規約</h1>
      <ol className="list-decimal ml-4 mb-4">
        <li>
          サービスの提供
          <br />
          本サービスは、ユーザーがJSON形式でER図を作成することを目的としたオンラインサービスです。本サービスの利用には、以下の利用規約に同意する必要があります。
        </li>
        <li>
          Googleログインとユーザー登録
          <br />
          ユーザーはGoogleアカウントを使用して本サービスにログインし、自動的にFirestoreにユーザー登録されます。ユーザーは自分に紐づいたDB設計のみ閲覧および作成する権限を有します。
        </li>
        <li>
          ユーザーの責任
          <br />
          ユーザーは、自分のGoogleアカウントを適切に管理し、第三者との共有や不正アクセスを防止する責任があります。また、本サービスの利用に関連するすべての行動に責任を負います。
        </li>
        <li>
          知的財産権
          <br />
          本サービスに含まれるすべてのコンテンツや資料は、知的財産権が保護されています。ユーザーは、これらのコンテンツや資料を複製、再配布、販売、または使用することはできません。
        </li>
        <li>
          免責事項
          <br />
          本サービスは「現状有姿」で提供されるため、明示または黙示を問わず、いかなる保証も行いません。本サービスの利用によって生じるいかなる損害や問題についても、運営者は責任を負いません。
        </li>
      </ol>
    </div>
  );
}
