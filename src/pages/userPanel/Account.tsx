import { useEffect, useRef, useState } from "react";
import SDCard from "../../components/shared/Card";
import { SDTabs } from "../../components/shared/Tabs";
import AccountInfo from "../../components/userPanel/Account/AccountInfo";
import Documents from "../../components/userPanel/Account/Documnets";
import PersonalInfo from "../../components/userPanel/Account/PersonalInfo";
import { TabsRef } from "flowbite-react";
import useAPi from "../../hooks/useApi";
import {
  DocumentsList,
  PersonalInfoEditRequest,
} from "../../models/account.models";
import { BaseResponse, UserGeneralInfo } from "../../models/shared.models";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useConfirm from "../../hooks/useConfirm";
import { toast } from "react-toastify";
import { accoutnActions } from "../../store/account";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Account: React.FC = () => {
  const [, setActiveTab] = useState<number>(0);
  const accountState = useAppSelector((state) => state.account);
  const tabsRef = useRef<TabsRef>(null);
  const props = { setActiveTab, tabsRef };
  const { sendRequest, isPending } = useAPi<
    PersonalInfoEditRequest,
    BaseResponse<null>
  >();

  const { sendRequest: sendGetDocumentsRequest } = useAPi<
    null,
    BaseResponse<DocumentsList>
  >();

  const {sendRequest:sendUserInfoRequest} = useAPi<null,BaseResponse<UserGeneralInfo>>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ConfirmModal, confirmation] = useConfirm(
    "آیا از صحت اطلاعات اطمینان دارید و مدارک برای تایید ارسال شود ؟ ",
    "تکمیل اطلاعات و ارسال"
  );

  function getUserInfo(){
    sendUserInfoRequest({
      url:'/Users/GetUserInformation'
    },(response)=>{
      dispatch(authActions.setUserGenralInfo(response.content))
    })
  }

  function getDcouments() {
    sendGetDocumentsRequest(
      {
        url: "/Users/GetUserDocument",
      },
      (response) => {
        dispatch(accoutnActions.setDocuments(response.content));
      }
    );
  }

  useEffect(() => {
    getDcouments();
  }, []);

  function onPersonalInfoSubmit() {
    props.tabsRef.current?.setActiveTab(2);
  }

  async function sendAllInformations() {
    const personalInfo = accountState.personalInfo;
    if (
      (accountState.attorneyDocument?.fileId &&
        !accountState.attorneyDocument?.expirationDate) ||
      (accountState.medicalDocument?.fileId &&
        !accountState.medicalDocument?.expirationDate)
    ) {
      return;
    }
    const confirmed = await confirmation();
    if (confirmed) {
      const body: PersonalInfoEditRequest = {
        birthDate: personalInfo?.birthDate || "",
        firstName: personalInfo?.birthDate || "",
        lastName: personalInfo?.lastName || "",
        nationalCode: personalInfo?.nationalCode || "",
        address: personalInfo?.address,
        cityId: personalInfo?.cityId,
        email: personalInfo?.email,
        emergencyContact: personalInfo?.emergencyContact,
        emergencyPhone: personalInfo?.emergencyPhone,
        height: personalInfo?.height,
        weight: personalInfo?.weight,
        nationalCardDocument: accountState.nationalCardDocument && {
          fileId: accountState.nationalCardDocument.fileId,
        },
        attorneyDocument: accountState.attorneyDocument && {
          fileId: accountState.attorneyDocument.fileId,
          expirationDate: accountState.attorneyDocument.expirationDate,
        },
        logBookDocument: accountState.logBookDocument && {
          fileId: accountState.logBookDocument.fileId,
        },
        medicalDocument: accountState.medicalDocument && {
          fileId: accountState.medicalDocument.fileId,
          expirationDate: accountState.medicalDocument.expirationDate,
        },
      };
      sendRequest(
        {
          url: "/Users/UserPersonalInformationCompletion/false",
          data: body,
          method: "post",
        },
        (response) => {
          toast.success(response.message);
          getDcouments();
          getUserInfo();
          navigate('/');
        },
        (error) => toast.error(error?.message)
      );
    }
  }
  return (
    <div>
      <ConfirmModal />
      <SDCard>
        <SDTabs.Group
          ref={props.tabsRef}
          aria-label="Tabs with underline"
          style="underline"
          onActiveTabChange={(tab) => props.setActiveTab(tab)}
        >
          <SDTabs.Item active title="اطلاعات کاربری">
            <AccountInfo></AccountInfo>
          </SDTabs.Item>
          <SDTabs.Item title="اطلاعات شخصی">
            <PersonalInfo onSubmit={onPersonalInfoSubmit} />
          </SDTabs.Item>
          <SDTabs.Item title="مدارک ارسالی">
            <Documents onSubmit={sendAllInformations} isPending={isPending} />
          </SDTabs.Item>
        </SDTabs.Group>
      </SDCard>
    </div>
  );
};
export default Account;
