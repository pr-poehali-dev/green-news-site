import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

type UserRole = "reader" | "moderator" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface NewsItem {
  id: string;
  type: "news" | "article" | "video" | "photo" | "poster" | "weather";
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  featured?: boolean;
  views?: number;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    type: "news",
    title: "Экологическая инициатива набирает обороты в регионе",
    excerpt: "Местные власти объявили о масштабной программе озеленения городских районов с акцентом на создание зеленых коридоров.",
    category: "Экология",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    author: "Мария Зеленова",
    date: "15 ноября 2025",
    featured: true,
    views: 2840
  },
  {
    id: "2",
    type: "article",
    title: "Как изменилась городская среда за последние 5 лет",
    excerpt: "Аналитический обзор трансформации общественных пространств и их влияния на качество жизни горожан.",
    category: "Аналитика",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600",
    author: "Игорь Петров",
    date: "14 ноября 2025",
    views: 1520
  },
  {
    id: "3",
    type: "video",
    title: "Репортаж: Зеленая энергетика в действии",
    excerpt: "Эксклюзивный видеоматериал о работе солнечной электростанции и её вкладе в устойчивое развитие.",
    category: "Видео",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600",
    author: "Анна Ветрова",
    date: "14 ноября 2025",
    views: 3120
  },
  {
    id: "4",
    type: "photo",
    title: "Фоторепортаж: Осенние краски парка Победы",
    excerpt: "Уникальная подборка снимков, запечатлевших золотую осень в самом сердце города.",
    category: "Фоторепортаж",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    author: "Дмитрий Светов",
    date: "13 ноября 2025",
    views: 980
  },
  {
    id: "5",
    type: "poster",
    title: "Фестиваль экологического кино пройдет 20-22 ноября",
    excerpt: "Три дня документального кино о природе, климате и устойчивом будущем планеты.",
    category: "Афиша",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600",
    author: "Редакция",
    date: "13 ноября 2025",
    views: 650
  },
  {
    id: "6",
    type: "weather",
    title: "Прогноз погоды на выходные: солнечно и тепло",
    excerpt: "Синоптики обещают комфортную погоду для осенних прогулок. Температура до +15°C.",
    category: "Погода",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    author: "Метеослужба",
    date: "15 ноября 2025",
    views: 1840
  },
  {
    id: "7",
    type: "news",
    title: "Новый велопарк открылся в Заречном районе",
    excerpt: "Современная инфраструктура для велосипедистов включает трассы разной сложности и зоны отдыха.",
    category: "Спорт",
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600",
    author: "Олег Быстров",
    date: "12 ноября 2025",
    views: 1210
  },
  {
    id: "8",
    type: "article",
    title: "Интервью с архитектором зеленых зданий",
    excerpt: "Разговор о будущем экологичной архитектуры и принципах проектирования устойчивых городов.",
    category: "Интервью",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600",
    author: "Елена Строева",
    date: "11 ноября 2025",
    views: 890
  }
];

export default function Index() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("main");
  const [loginTab, setLoginTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    setCurrentUser({
      id: "1",
      name: email.split("@")[0],
      email: email,
      role: email.includes("admin") ? "admin" : email.includes("moderator") ? "moderator" : "reader"
    });
  };

  const handleRegister = () => {
    setCurrentUser({
      id: "2",
      name: name,
      email: email,
      role: "reader"
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEmail("");
    setPassword("");
    setName("");
  };

  const filteredNews = mockNews.filter(item => {
    if (activeTab === "main") return true;
    if (activeTab === "video") return item.type === "video";
    if (activeTab === "regional") return item.category !== "Видео";
    if (activeTab === "popular") return (item.views || 0) > 1000;
    return true;
  });

  const featuredNews = mockNews.find(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Leaf" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: 'Cormorant, serif' }}>Честные Новости</h1>
                <p className="text-xs text-muted-foreground">Новости, события, аналитика</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{currentUser.name}</p>
                    <Badge variant={currentUser.role === "admin" ? "default" : currentUser.role === "moderator" ? "secondary" : "outline"} className="text-xs">
                      {currentUser.role === "admin" ? "Администратор" : currentUser.role === "moderator" ? "Модератор" : "Читатель"}
                    </Badge>
                  </div>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <Icon name="LogOut" size={18} />
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <Icon name="User" size={18} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Вход в систему</DialogTitle>
                      <DialogDescription>
                        Войдите или зарегистрируйтесь для полного доступа
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs value={loginTab} onValueChange={setLoginTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-login">Email</Label>
                          <Input
                            id="email-login"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-login">Пароль</Label>
                          <Input
                            id="password-login"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Подсказка: используйте admin@test.com для роли администратора, moderator@test.com для модератора
                        </p>
                        <Button className="w-full" onClick={handleLogin}>Войти</Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name-register">Имя</Label>
                          <Input
                            id="name-register"
                            placeholder="Иван Иванов"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-register">Email</Label>
                          <Input
                            id="email-register"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-register">Пароль</Label>
                          <Input
                            id="password-register"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <Button className="w-full" onClick={handleRegister}>Зарегистрироваться</Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <nav className="flex gap-1">
            <Button
              variant={activeTab === "main" ? "default" : "ghost"}
              onClick={() => setActiveTab("main")}
              className="rounded-full"
            >
              Главное
            </Button>
            <Button
              variant={activeTab === "video" ? "default" : "ghost"}
              onClick={() => setActiveTab("video")}
              className="rounded-full"
            >
              Видео
            </Button>
            <Button
              variant={activeTab === "regional" ? "default" : "ghost"}
              onClick={() => setActiveTab("regional")}
              className="rounded-full"
            >
              В области
            </Button>
            <Button
              variant={activeTab === "popular" ? "default" : "ghost"}
              onClick={() => setActiveTab("popular")}
              className="rounded-full"
            >
              Популярное
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "main" && featuredNews && (
          <Card className="mb-12 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div 
                className="h-[400px] md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredNews.image})` }}
              />
              <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-secondary/30">
                <Badge className="w-fit mb-4 bg-primary text-white">{featuredNews.category}</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Cormorant, serif' }}>
                  {featuredNews.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    {featuredNews.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} />
                    {featuredNews.views?.toLocaleString()}
                  </div>
                </div>
                <Button size="lg" className="w-fit">
                  Читать полностью
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {currentUser?.role === "admin" && (
          <Card className="mb-8 bg-accent/10 border-accent">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Plus" size={24} className="text-accent mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
                    Панель администратора
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Создавайте и публикуйте новости, статьи, видео, фоторепортажи, афиши и прогнозы погоды
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Новая статья
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Video" size={16} className="mr-2" />
                      Добавить видео
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Image" size={16} className="mr-2" />
                      Фоторепортаж
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Афиша
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Cloud" size={16} className="mr-2" />
                      Погода
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentUser?.role === "moderator" && (
          <Card className="mb-8 bg-secondary/50 border-secondary">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Shield" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
                    Панель модератора
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Модерация комментариев и отзывов читателей
                  </p>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Новые комментарии (8)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((item) => (
            <Card key={item.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
              <div 
                className="h-48 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                  {item.category}
                </Badge>
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name="Play" size={28} className="text-primary ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: 'Cormorant, serif' }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={14} />
                    {item.author}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {item.views?.toLocaleString()}
                    </div>
                    <div>{item.date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Leaf" size={18} className="text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Cormorant, serif' }}>Честные Новости</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш источник актуальных новостей, аналитики и событий
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Статьи</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Видео</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Фоторепортажи</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">О портале</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Редакция</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Реклама</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Подписка</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Получайте свежие новости на почту
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="text-sm" />
                <Button size="sm">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Зелёный вестник. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}