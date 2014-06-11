/*
 * Copyright (c) 2013 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef HSERVICE_H_
#define HSERVICE_H_

#include <QObject>
#include <bb/PpsObject>
#include <bb/Application>
#include <bb/pim/message/MessageService.hpp>
#include <bb/pim/message/MessageBody.hpp>
#include <bb/pim/message/MessageUpdate.hpp>
#include <bb/pim/message/Attachment>
#include <bb/pim/message/MessageUpdateType.hpp>
#include <bb/pim/message/MessageContact>
#include <bb/pim/message/MessageFilter.hpp>
#include <bb/pim/account/Account>
#include <bb/pim/account/AccountsChanged.hpp>
#include <bb/pim/account/AccountService>
#include <bb/pim/account/Service>
#include <bb/pim/account/Provider.hpp>
#include <bb/pim/message/Conversation>



using namespace bb::pim::message;
using namespace bb::pim::account;
using namespace bb;
class HService: public QObject {
Q_OBJECT
public:
	HService(bb::Application * app);

public slots:
	void init();
	void bodyDownloaded(bb::pim::account::AccountKey, bb::pim::message::MessageKey);
	void messageUpdated(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, bb::pim::message::MessageUpdate);
	void messagesAdded(bb::pim::account::AccountKey, QList<bb::pim::message::ConversationKey>, QList<bb::pim::message::MessageKey>);
	void messageAdded(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey);
	void messageRemoved(bb::pim::account::AccountKey, bb::pim::message::ConversationKey, bb::pim::message::MessageKey, QString);
	void accountsChanged(bb::pim::account::AccountsChanged changes);

private:
	MessageService* m_messageService;
	AccountService* m_accountService;
};

#endif /* HSERVICE_H_ */
