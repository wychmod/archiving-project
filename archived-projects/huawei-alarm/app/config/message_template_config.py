

class BaseMessageTemplate:
    """
    基础消息模板类
    """
    def __init__(self, title: str, content: str, principal: str, redirect_url: str, time: str):
        self.title: str = title
        self.content = content
        self.principal = principal
        self.redirect_url = redirect_url
        self.time = time

    def build_message(self):
        pass


class BaseTextMessage(BaseMessageTemplate):
    """
    基础text模板类
    """
    def __init__(self, title: str, content: str, principal: str, redirect_url: str, time: str):
        super().__init__(title, content, principal, redirect_url, time)

    def build_message(self):
        return {
            "text": self.content
        }


class UserAlarmInteractive(BaseMessageTemplate):
    """
    私聊警报消息卡片类
    """
    def __init__(self, title: str, content: str, principal: str, redirect_url: str, time: str):
        super().__init__(title, content, principal, redirect_url, time)

    def build_message(self):
        return {
            "elements": [
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": [
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": [
                                {
                                    "tag": "div",
                                    "text": {
                                        "content": "**🕐 时间：**\n"+self.time,
                                        "tag": "lark_md"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": []
                        }
                    ]
                },
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": []
                },
                {
                    "tag": "div",
                    "text": {
                        "content": self.content,
                        "tag": "lark_md"
                    }
                },
                {
                    "actions": [
                        {
                            "tag": "button",
                            "text": {
                                "content": "Web Redict",
                                "tag": "plain_text"
                            },
                            "type": "primary",
                            "value": {
                                "key1": "value1"
                            },
                            "multi_url": {
                                "url": self.redirect_url,
                                "pc_url": "",
                                "android_url": "",
                                "ios_url": ""
                            }
                        }
                    ],
                    "tag": "action"
                },
                {
                    "tag": "hr"
                },
                {
                    "tag": "markdown",
                    "content": "There is a problem with your project\n\n"
                }
            ],
            "header": {
                "template": "red",
                "title": {
                    "content": self.title,
                    "tag": "plain_text"
                }
            }
        }


class ChatAlarmInteractive(BaseMessageTemplate):
    """
    群聊警报消息卡片类
    """
    def __init__(self, title: str, content: str, principal: str, redirect_url: str, time: str):
        super().__init__(title, content, principal, redirect_url, time)

    def build_message(self):
        return {
            "elements": [
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": [
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": [
                                {
                                    "tag": "div",
                                    "text": {
                                        "content": "**👤 工程owner：**\n " + self.principal,
                                        "tag": "lark_md"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": [
                                {
                                    "tag": "div",
                                    "text": {
                                        "content": "**🕐 时间：**\n" + self.time,
                                        "tag": "lark_md"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": []
                },
                {
                    "tag": "div",
                    "text": {
                        "content": self.content,
                        "tag": "lark_md"
                    }
                },
                {
                    "actions": [
                        {
                            "tag": "button",
                            "text": {
                                "content": "Web Redict",
                                "tag": "lark_md"
                            },
                            "type": "primary",
                            "value": {
                                "key1": "value1"
                            },
                            "multi_url": {
                                "url": self.redirect_url,
                                "pc_url": "",
                                "android_url": "",
                                "ios_url": ""
                            }
                        }
                    ],
                    "tag": "action"
                },
                {
                    "tag": "hr"
                },
                {
                    "tag": "markdown",
                    "content": "Contect " + self.principal + " when encounter  problems"
                }
            ],
            "header": {
                "template": "red",
                "title": {
                    "content": self.title,
                    "tag": "lark_md"
                }
            }
        }


class ChatAlarmSolveInteractive(BaseMessageTemplate):
    """
    群聊解决警报消息卡片类
    """
    def __init__(self, title: str, content: str, principal: str, redirect_url: str, time: str):
        super().__init__(title, content, principal, redirect_url, time)

    def build_message(self):
        return {
            "elements": [
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": [
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": [
                                {
                                    "tag": "div",
                                    "text": {
                                        "content": "**👤 工程owner：**\n" + self.principal,
                                        "tag": "lark_md"
                                    }
                                }
                            ]
                        },
                        {
                            "tag": "column",
                            "width": "weighted",
                            "weight": 1,
                            "vertical_align": "top",
                            "elements": [
                                {
                                    "tag": "div",
                                    "text": {
                                        "content": "**🕐 时间：**\n" + self.time,
                                        "tag": "lark_md"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "tag": "column_set",
                    "flex_mode": "none",
                    "background_style": "default",
                    "columns": []
                },
                {
                    "tag": "div",
                    "text": {
                        "content": self.content,
                        "tag": "lark_md"
                    }
                },
                {
                    "tag": "hr"
                },
                {
                    "tag": "note",
                    "elements": [
                        {
                            "tag": "lark_md",
                            "content": "✅ " + self.principal + "已处理此报警"
                        }
                    ]
                }
            ],
            "header": {
                "template": "turquoise",
                "title": {
                    "content": self.title,
                    "tag": "lark_md"
                }
            }
        }

