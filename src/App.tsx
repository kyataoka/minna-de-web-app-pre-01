import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
  Drawer,
  Avatar
} from '@mui/material';
import {
  Menu,
  Headphones,
  MusicNote,
  VolumeUp,
  Star,
  TrendingUp,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const products = [
    {
      id: 1,
      name: 'KZ ZSX',
      price: '¥8,500',
      image: 'https://via.placeholder.com/300x200?text=KZ+ZSX',
      description: '5BA+1DD ハイブリッドイヤホン',
      features: ['10mmダイナミックドライバー', '5基のバランスドアーマチュア', 'ハイレゾ対応']
    },
    {
      id: 2,
      name: 'KZ ZS10 Pro',
      price: '¥6,800',
      image: 'https://via.placeholder.com/300x200?text=KZ+ZS10+Pro',
      description: '4BA+1DD プロフェッショナル',
      features: ['高解像度サウンド', 'ケーブル着脱式', '人間工学設計']
    },
    {
      id: 3,
      name: 'KZ AS16',
      price: '¥12,000',
      image: 'https://via.placeholder.com/300x200?text=KZ+AS16',
      description: '8BA フラッグシップモデル',
      features: ['8基バランスドアーマチュア', 'プレミアム音質', '3Dプリント筐体']
    }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            )}
            <Headphones sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              KZ Audio
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit">製品</Button>
                <Button color="inherit">会社概要</Button>
                <Button color="inherit">サポート</Button>
                <Button color="inherit">お問い合わせ</Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List sx={{ width: 250 }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="製品" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="会社概要" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="サポート" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="お問い合わせ" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h1" component="h1" gutterBottom>
              KZ Audio
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              プロフェッショナル品質のイヤホンを手頃な価格で
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              音楽愛好家とオーディオプロフェッショナルのために設計された、
              革新的なドライバー技術による高品質サウンド体験
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              製品を見る
            </Button>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
            なぜKZを選ぶのか
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
                  <VolumeUp fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  高音質
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  バランスドアーマチュアとダイナミックドライバーの
                  ハイブリッド構成による優れた音質
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
                  <TrendingUp fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  コストパフォーマンス
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  プロレベルの品質を手頃な価格で提供し、
                  音楽体験を身近なものに
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
                  <Star fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  革新的技術
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  最新のドライバー技術と人間工学に基づいた
                  デザインの融合
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Products Section */}
        <Box sx={{ bgcolor: 'background.default', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
              人気製品
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {product.features.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button variant="contained" fullWidth>
                        詳細を見る
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Company Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                KZ Audioについて
              </Typography>
              <Typography variant="body1" paragraph>
                KZ Audioは、音楽愛好家とオーディオプロフェッショナルのために
                高品質なイヤホンを開発する中国のオーディオメーカーです。
              </Typography>
              <Typography variant="body1" paragraph>
                2008年の設立以来、革新的なドライバー技術と手頃な価格を両立させ、
                世界中の音楽ファンに愛され続けています。
              </Typography>
              <Typography variant="body1" paragraph>
                バランスドアーマチュアとダイナミックドライバーを組み合わせた
                ハイブリッド設計により、クリアで迫力のあるサウンドを実現しています。
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                }}
              >
                <MusicNote sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  15年以上
                </Typography>
                <Typography variant="body1">
                  オーディオ業界での経験と革新
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  KZ Audio
                </Typography>
                <Typography variant="body2" paragraph>
                  高品質なイヤホンで音楽体験を豊かに。
                  プロフェッショナルから愛好家まで、
                  すべての人に最高のサウンドを。
                </Typography>
                <Box>
                  <IconButton color="inherit">
                    <Facebook />
                  </IconButton>
                  <IconButton color="inherit">
                    <Twitter />
                  </IconButton>
                  <IconButton color="inherit">
                    <Instagram />
                  </IconButton>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  リンク
                </Typography>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemText primary="製品一覧" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="サポート" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="保証について" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="よくある質問" />
                  </ListItem>
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  お問い合わせ
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography variant="body2">info@kzaudio.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography variant="body2">03-1234-5678</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="body2">東京都渋谷区</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: 1, borderColor: 'grey.700', mt: 4, pt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="grey.400">
                © 2024 KZ Audio. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
